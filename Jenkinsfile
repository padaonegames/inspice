// --------------------
// PIPELINE
// --------------------

pipeline {
    agent any

    stages {

	    stage ('Clone repository') {
            steps {
	  		    checkout scm
            }
	    }

        stage ('Compile / Build images') {
            steps {
                withCredentials([
                    string(credentialsId='spice-activity-demo-api-key', variable: 'REACT_APP_API_KEY'),
                    string(credentialsId='spice-activity-demo-dataset-uuid', variable: 'REACT_APP_DATASET_UUID')
                ]) {
                    script {
	  	               image = docker.build("spice/spice-activity-demo/spice/activity-demo");
                    }
                }
            }
	    }

    }
}
