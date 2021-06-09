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
                    string(credentialsId='spice-activity-demo-api-key', varible: 'REACT_APP_API_KEY'),
                    string(credentialsId='spice-activity-demo-dataset-uuid', varible: 'REACT_APP_DATASET_UUID')
                ]) {
	  	            image = docker.build("spice/spice-activity-demo/spice/activity-demo");
                }
            }
	    }


    }
}
