import React, { useState, useEffect } from 'react';
import "./Form.css";
import axios from 'axios';
import { saveAs } from 'file-saver';

function Form() {

  const [formData, setFormData] = useState({
    appName: '',
    packageName: '',
    databaseType: '',
    buildTool: '',
    features: [],
    formatCode: []
  })

  
  function validateSpecialChars(value) {
      const specialChars = [
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '-',
        '+',
        '=',
        '[',
        '{',
        ']',
        '}',
        ':',
        ';',
        '<',
        '>',
      ];
      const digits = ['0','1','2','3','4','5','6','7','8','9'];
      if (specialChars.includes(value.charAt(0)) || digits.includes(value.charAt(0))) {
          return true;
      }
  }

  function validateForm() {
    
    //validations

    if (formData.appName.length === 0) {
      alert('Invalid Form, appName can not be empty')
      return false;
    } 
  
    if (formData.packageName.length === 0) {
      alert('Invalid Form, packageName can not be empty')
      return false;
    }
    if (formData.databaseType.length === 0) {
      alert('Invalid Form, databaseType can not be empty')
      return false;
    }

    if (formData.buildTool.length === 0) {
      alert('Invalid Form, buildTool can not be empty')
      return false;
    }

    if(validateSpecialChars(formData.appName))
    {
      alert('Invalid Form, appName can not start with special characters or number')
      return false;
    }
    if(validateSpecialChars(formData.packageName))
    {
      alert('Invalid Form, packageName can not start with special characters or number')
      return false;
    }

    return true;
  }

  const onChangeHandler = (event) => {

    console.log(event)
    if (event.target.name === 'features') {

      let copy = { ...formData }

      if (event.target.checked) {
        copy.features.push(event.target.value)
      } else {
        copy.features = copy.features.filter(el => el !== event.target.value)
      }
      setFormData(copy)

    }

    else  if (event.target.name === 'formatCode') {

      let copy = { ...formData }

      if (event.target.checked) {
        copy.formatCode.push(event.target.value)
      } else {
        copy.formatCode = copy.formatCode.filter(el => el !== event.target.value)
      }
      setFormData(copy)

    }
   
    else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value
      }))
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formData)
  }

  async function callDownloadApi() {

    if(validateForm()) {

      console.log("sharad - " + typeof(formData.formatCode));
        console.log(formData.formatCode);
        if(Object.keys(formData.formatCode).length === 0) {
          formData.formatCode = false;
          console.log("sharad - " + typeof(formData.formatCode));
          console.log("jefbk");
        } else {
          formData.formatCode = true;
        }

    const response = await axios.post("http://localhost:3020/download",formData)
   
    console.log("response : " + response.data)
    return response.data;
}}

async function downloadzip(){
  try {
    // Replace 'your-server-endpoint' with the actual endpoint for downloading the file
    const downloadEndpoint = 'http://localhost:3020/download';

    // Make an Axios request to the server endpoint
    const response = await axios.post(downloadEndpoint, formData,{
      responseType: 'blob', // Important: responseType should be 'blob' for binary data
    });

    // Extract the file name from the response headers or provide a default name
    // const filename = response.headers['content-disposition']
    //   ? response.headers['content-disposition'].split('filename=')[1]
    //   : 'downloaded-file';

    // Use FileSaver to save the file
    saveAs(new Blob([response.data]), "test901.zip");
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}


  return (
    <div>
      <div className='nav'><h2>JVM Project Generator</h2></div>
    <div className='flexbox-container'>
    
   <div className='flexbox-item flexbox-item-1'><h3>Project Settings</h3><hr/>
 
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="appName" className="form-label">Project Name</label>
          <input className="form-control" name="appName" onChange={onChangeHandler} value={formData.appName} />
        </div>
        <div className="form-group">
          <label htmlFor="packageName" className="form-label">Project Group</label>
          <input className="form-control" name="packageName" onChange={onChangeHandler} value={formData.packageName} />
        </div>
        <div className="form-group">
          <label htmlFor="databaseType" className="form-label">Database</label>
          <div>
            <div>
              <input type="radio" name="databaseType" value="mysql" onChange={onChangeHandler} checked={formData.databaseType === 'mysql'} />
              <label htmlFor="mysql">Mysql</label>
            </div>
            <div>
              <input type="radio" name="databaseType" value="postgress" onChange={onChangeHandler} checked={formData.databaseType === 'postgress'} />
              <label htmlFor="postgress">Postgress</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="buildTool" className="form-label">Build Tool</label>
          <div>
            <div>
              <input type="radio" name="buildTool" value="gradle" onChange={onChangeHandler} checked={formData.buildTool === 'gradle'} />
              <label htmlFor="gradle">Gradle</label>
            </div>
            <div>
              <input type="radio" name="buildTool" value="maven" onChange={onChangeHandler} checked={formData.buildTool === 'maven'} />
              <label htmlFor="maven">Maven</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="features" className="form-label">Code Quality, Analyser, Coverage Tool</label>
          <div>
            <div>
              <input type="checkbox" name="features" value="sonar" onChange={onChangeHandler} checked={formData.features.indexOf('sonar') !== -1} />
              <label htmlFor="sonar">Sonar</label>
            </div>
            <div>
              <input type="checkbox" name="features" value="pmd" onChange={onChangeHandler} checked={formData.features.indexOf('pmd') !== -1} />
              <label htmlFor="pmd">PMD</label>
            </div>
            <div>
              <input type="checkbox" name="features" value="spotBugs" onChange={onChangeHandler} checked={formData.features.indexOf('spotBugs') !== -1} />
              <label htmlFor="spotBugs">Spot Bugs</label>
            </div>
            <div>
              <input type="checkbox" name="features" value="jacoco" onChange={onChangeHandler} checked={formData.features.indexOf('jacoco') !== -1} />
              <label htmlFor="jacoco">Jacoco</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="formatCode" className="form-label">Code Formatting Tool</label>
          <div>
            <div>
              <input type="checkbox" name="formatCode" value="spotless" onChange={onChangeHandler} checked={formData.formatCode.indexOf('spotless') !== -1}/>
              <label htmlFor="spotless">spotless</label>
            </div>
          </div>
        </div>


        <div className="form-group">
          <label htmlFor="features" className="form-label">Code Quality, Analyser, Coverage Tool</label>
          <div>
            <div>
              <input type="checkbox" name="features" value="dockerFile" onChange={onChangeHandler} checked={formData.features.indexOf('dockerFile') !== -1} />
              <label htmlFor="dockerFile">Docker File</label>
            </div>
            <div>
              <input type="checkbox" name="features" value="junit" onChange={onChangeHandler} checked={formData.features.indexOf('junit') !== -1} />
              <label htmlFor="junit">Junit 5</label>
            </div>
            <div>
              <input type="checkbox" name="features" value="owasp" onChange={onChangeHandler} checked={formData.features.indexOf('owasp') !== -1} />
              <label htmlFor="owasp">OWASP</label>
            </div>
            <div>
              <input type="checkbox" name="features" value="prometheus" onChange={onChangeHandler} checked={formData.features.indexOf('prometheus') !== -1} />
              <label htmlFor="prometheus">Prometheus</label>
            </div>

            <div>
              <input type="checkbox" name="features" value="liquibase" onChange={onChangeHandler} checked={formData.features.indexOf('liquibase') !== -1} />
              <label htmlFor="liquibase">Liquibase</label>
            </div>
            <div>
              <input type="checkbox" name="features" value="kafka" onChange={onChangeHandler} checked={formData.features.indexOf('kafka') !== -1} />
              <label htmlFor="kafka">Kafka</label>
            </div>
          </div>
        </div>


        
        <div className="form-group">
          <label htmlFor="features" className="form-label">Enable features</label>
          <div>
            <div>
              <input type="checkbox" name="features" value="health" onChange={onChangeHandler} checked={formData.features.indexOf('health') !== -1} />
              <label htmlFor="health">Health</label>
            </div>
            <div>
              <input type="checkbox" name="features" value="auditEvent" onChange={onChangeHandler} checked={formData.features.indexOf('auditEvent') !== -1} />
              <label htmlFor="auditEvent">Audit Event</label>
            </div>
            <div>
              <input type="checkbox" name="features" value="loggers" onChange={onChangeHandler} checked={formData.features.indexOf('loggers') !== -1} />
              <label htmlFor="loggers">Loggers</label>
            </div>
          
          </div>
        </div>

        <div className="form-group">
          <button className="newbtn" onClick={downloadzip} >Generate</button>
        </div>
      </form>
    </div>
  
   <div className='flexbox-item flexbox-item-2'><h3>Entity Generation</h3><hr/>
   Entity 1
   <div className='flexbox-item entity'>
   <div className="form-group">
          <label htmlFor="entityName" className="form-label">Name of the entity to generate</label>
          <input className="form-control" name="entityName" onChange={onChangeHandler} value={formData.entityName} />
        </div>
        <div className="form-group">
          <label htmlFor="entityPackageName" className="form-label">Package name of the Entity</label>
          <input className="form-control" name="entityPackageName" onChange={onChangeHandler} value={formData.entityPackageName} />
        </div>
   </div>
   
   </div>
  </div></div>
  )
}

export default Form
