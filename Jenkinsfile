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
// a false, sólo se crea y publica la imagen pero no se
// despliega. En caso contrario, debe tener la información
// del host donde se despliega (clave a las entradas definidas
// en deployMachines()) y el fichero específico de
// variables de entorno.
def deployInfo() {
    [
            'iss01-ci-cd': false
    ]
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
            steps {
                withCredentials([
                    string(credentialsId:'spice-activity-demo-api-key', variable: 'REACT_APP_API_KEY'),
                    string(credentialsId:'spice-activity-demo-dataset-uuid', variable: 'REACT_APP_DATASET_UUID')
                ]) {
                    script {
	  	               image = docker.build("spice/spice-activity-demo/spice/activity-demo");
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


    }
}
