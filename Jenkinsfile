// --------------------
// CONFIGURACIÓN RELACIONADA CON EL DESPLEGADO
// --------------------

// Lista de máquinas donde se despliega la aplicación y
// sus datos de acceso para el servidor de desplegado
def deployMachines() {
    [
        gaiatemp: [
            host: 'gaiatemp.fdi.ucm.es',
            user: 'deployer',
            sshKey: 'ssh-secret-gaiatemp',
            fingerprint: 'fingerprint-gaiatemp'
        ]
    ]
}

// Lista de las ramas que generan imagen en el registro.
// Si el valor asociado al nombre de la rama es equivalente
// a false, o tiene valor pero no hay clave "backendUrl", no se
// hará nada cuando haya un commit a la rama. Si hay clave backendUrl
// para ella, se creará la imagen.
// Para que, además, se despliegue, debe tener la información
// del host donde se despliega (clave a las entradas definidas
// en deployMachines()) y el fichero específico de
// variables de entorno.
def deployInfo() {
    [
            'master':  [
                host: 'gaiatemp',
                envFile: 'spice-activity-demo.env.master',
                backendUrl: 'spice-activity-demo.backend.master' // Usada durante la build
            ],
            'dev':  [
                host: 'gaiatemp',
                envFile: 'spice-activity-demo.env.dev',
                backendUrl: 'spice-activity-demo.backend.dev' // Usada durante la build
            ]
    ]
}

// Directorio base dentro del repositorio desde el que hacer
// el desplegado
def deployerFolder() {
    'deploy'
}

// --------------------
// PIPELINE
// --------------------

pipeline {
    agent any

    stages {

        stage ('Prepare environment') {
            steps {
                script {
                    deployBranches = deployInfo()
                    deployHosts = deployMachines()
                }
            }
        }

	    stage ('Clone repository') {
            steps {
	  		    checkout scm
            }
	    }

        stage ('Compile / Build images') {
            when {
                expression {
                    deployBranches[env.BRANCH_NAME] &&
                    deployBranches[env.BRANCH_NAME].containsKey('backendUrl')
                }
            }
            steps {
                withCredentials([
                    string(credentialsId:'spice-activity-demo-api-key', variable: 'REACT_APP_API_KEY'),
                    string(credentialsId:'spice-activity-demo-dataset-uuid', variable: 'REACT_APP_DATASET_UUID'),
                    string(credentialsId: deployBranches[env.BRANCH_NAME].backendUrl, variable: 'REACT_APP_SERVER_API_URL')
                ]) {
                    script {
	  	               image = docker.build("spice/spice-activity-demo/spice/activity-demo",
                         "--build-arg REACT_APP_API_KEY=${REACT_APP_API_KEY} --build-arg REACT_APP_DATASET_UUID=${REACT_APP_DATASET_UUID} --build-arg REACT_APP_SERVER_API_URL=${REACT_APP_SERVER_API_URL} ."
                         );
                    }
                }
            }
	    }

        // Subida de la imagen al registro; solo en ramas listadas
        // en deployInfo()
        stage('Push image') {
            when {
                expression {
                    deployBranches.containsKey(env.BRANCH_NAME)
                }
            }
            steps {
                script {
                    docker.withRegistry('https://docker.padaonegames.com', 'spice-registry-rw') {
                        image.push("latest-"+env.BRANCH_NAME)
                        image.push("latest")
                    }
                }
            }
        }

        // Desplegado de las imágenes
        stage('Deploy') {
            when {
                expression {
                    deployBranches[env.BRANCH_NAME] &&
                    deployBranches[env.BRANCH_NAME].containsKey('host') &&
                    deployBranches[env.BRANCH_NAME].containsKey('envFile')
                }
            }
            steps {
                echo "Desplegamos en ${deployBranches[env.BRANCH_NAME].host} usando ${deployBranches[env.BRANCH_NAME].envFile}"
                
                deploy(deployBranches[env.BRANCH_NAME].host, deployBranches[env.BRANCH_NAME].envFile)
            }
        }


    }
}

// ---------------------------------
// FUNCIÓN DE DESPLEGADO
// ---------------------------------

def deploy(hostMachine, envFile) {

    // ---- Información de la imagen que hace el desplegado
    def workerImageRegistry = 'https://docker.padaonegames.com'
    def workerImage = 'ci/docker-with-compose'
    def registryCredentials = 'git-registry-ro'
    // -----------------------------------------------------

    // ---- Información del host donde se despliega
    def hostSSHKey = deployHosts[hostMachine].sshKey
    def hostFingerprint = deployHosts[hostMachine].fingerprint
    def hostURL = deployHosts[hostMachine].host
    def hostUser = deployHosts[hostMachine].user
    // -----------------------------------------------------

    def scmMap = ""
    if (env.WORKSPACE) {
        scmMap = '-v \"$WORKSPACE:/wc\" '
    }

    docker.withRegistry(workerImageRegistry, registryCredentials) {
        docker.image(workerImage).inside(scmMap + "-u root") {
            withCredentials([file(credentialsId: envFile, variable: 'ENV_FILE')]) {
            withCredentials([sshUserPrivateKey(credentialsId: hostSSHKey, keyFileVariable: 'SECRET_KEY_FILE')]) {
            withCredentials([string(credentialsId: hostFingerprint, variable: 'FINGERPRINT')]) {

                echo "Desplegamos en ${hostUser}@${hostURL}"

                sh """
                    cd /wc/${deployerFolder()}
                    echo "Registrando clave privada"
                    eval \$(ssh-agent)
                    ssh-add -L || true
                    ssh-add "${SECRET_KEY_FILE}"
                    ssh-add -L
                    echo "Registrando known_host"
                    ssh-keyscan -H ${hostURL} > fingerprints 2>/dev/null
                    if ! cat fingerprints | grep ${FINGERPRINT}; then
                        echo "Fingerprint incorrecto ¿Man in the middle? ¿Nueva instalación?"
                        exit 1
                    fi
                    mkdir -p /root/.ssh
                    cat fingerprints > /root/.ssh/known_hosts
                    rm fingerprints
                    docker-compose -H ssh://${hostUser}@${hostURL} --env-file ${ENV_FILE} pull
                    docker-compose -H ssh://${hostUser}@${hostURL} --env-file ${ENV_FILE} up -d
                    echo "Eliminando clave privada"
                    ssh-add -D
                    ssh-add -L || true
                """

            }
            }
            }
        }
    }
}
