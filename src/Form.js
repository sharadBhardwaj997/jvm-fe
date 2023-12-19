import React, { useState, useEffect } from 'react';
import "./Form.css";
import axios from 'axios';


function Form() {

  const [formData, setFormData] = useState({
    appName: '',
    packageName: '',
    databaseType: '',
    buildTool: '',
    codeQuality: [],
    codeFormatting:[],
    advanceSettings:[],
    actuators:[],
    entityName: '',
    entityPackageName:'',
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
    if (event.target.name === 'codeQuality') {

      let copy = { ...formData }

      if (event.target.checked) {
        copy.codeQuality.push(event.target.value)
      } else {
        copy.codeQuality = copy.codeQuality.filter(el => el !== event.target.value)
      }
      setFormData(copy)

    }
    
    else    if (event.target.name === 'advanceSettings') {

      let copy = { ...formData }

      if (event.target.checked) {
        copy.advanceSettings.push(event.target.value)
      } else {
        copy.advanceSettings = copy.advanceSettings.filter(el => el !== event.target.value)
      }


      setFormData(copy)

    } else  if (event.target.name === 'actuators') {

      let copy = { ...formData }

      if (event.target.checked) {
        copy.actuators.push(event.target.value)
      } else {
        copy.actuators = copy.actuators.filter(el => el !== event.target.value)
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

  async function axiosTest() {

    if(validateForm()) {

    const response = await axios.post("http://localhost:8000/api/postData",formData)
   
    console.log("response : " + response.data)
    return response.data;
}}

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
          <label htmlFor="codeQuality" className="form-label">Code Quality, Analyser, Coverage Tool</label>
          <div>
            <div>
              <input type="checkbox" name="codeQuality" value="sonar" onChange={onChangeHandler} checked={formData.codeQuality.indexOf('sonar') !== -1} />
              <label htmlFor="sonar">Sonar</label>
            </div>
            <div>
              <input type="checkbox" name="codeQuality" value="pmd" onChange={onChangeHandler} checked={formData.codeQuality.indexOf('pmd') !== -1} />
              <label htmlFor="pmd">PMD</label>
            </div>
            <div>
              <input type="checkbox" name="codeQuality" value="spotBugs" onChange={onChangeHandler} checked={formData.codeQuality.indexOf('spotBugs') !== -1} />
              <label htmlFor="spotBugs">Spot Bugs</label>
            </div>
            <div>
              <input type="checkbox" name="codeQuality" value="jacoco" onChange={onChangeHandler} checked={formData.codeQuality.indexOf('jacoco') !== -1} />
              <label htmlFor="jacoco">Jacoco</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="codeFormatting" className="form-label">Code Formatting Tool</label>
          <div>
            <div>
              <input type="checkbox" name="codeFormatting" value="spotless" onChange={onChangeHandler} checked={formData.codeFormatting.indexOf('spotless') !== -1} />
              <label htmlFor="spotless">spotless</label>
            </div>
          </div>
        </div>


        <div className="form-group">
          <label htmlFor="advanceSettings" className="form-label">Code Quality, Analyser, Coverage Tool</label>
          <div>
            <div>
              <input type="checkbox" name="advanceSettings" value="dockerFile" onChange={onChangeHandler} checked={formData.advanceSettings.indexOf('dockerFile') !== -1} />
              <label htmlFor="dockerFile">Docker File</label>
            </div>
            <div>
              <input type="checkbox" name="advanceSettings" value="junit" onChange={onChangeHandler} checked={formData.advanceSettings.indexOf('junit') !== -1} />
              <label htmlFor="junit">Junit 5</label>
            </div>
            <div>
              <input type="checkbox" name="advanceSettings" value="owasp" onChange={onChangeHandler} checked={formData.advanceSettings.indexOf('owasp') !== -1} />
              <label htmlFor="owasp">OWASP</label>
            </div>
            <div>
              <input type="checkbox" name="advanceSettings" value="prometheus" onChange={onChangeHandler} checked={formData.advanceSettings.indexOf('prometheus') !== -1} />
              <label htmlFor="prometheus">Prometheus</label>
            </div>

            <div>
              <input type="checkbox" name="advanceSettings" value="liquibase" onChange={onChangeHandler} checked={formData.advanceSettings.indexOf('liquibase') !== -1} />
              <label htmlFor="liquibase">Liquibase</label>
            </div>
            <div>
              <input type="checkbox" name="advanceSettings" value="kafka" onChange={onChangeHandler} checked={formData.advanceSettings.indexOf('kafka') !== -1} />
              <label htmlFor="kafka">Kafka</label>
            </div>
          </div>
        </div>


        
        <div className="form-group">
          <label htmlFor="actuators" className="form-label">Enable Actuators</label>
          <div>
            <div>
              <input type="checkbox" name="actuators" value="health" onChange={onChangeHandler} checked={formData.actuators.indexOf('health') !== -1} />
              <label htmlFor="health">Health</label>
            </div>
            <div>
              <input type="checkbox" name="actuators" value="auditEvent" onChange={onChangeHandler} checked={formData.actuators.indexOf('auditEvent') !== -1} />
              <label htmlFor="auditEvent">Audit Event</label>
            </div>
            <div>
              <input type="checkbox" name="actuators" value="loggers" onChange={onChangeHandler} checked={formData.actuators.indexOf('loggers') !== -1} />
              <label htmlFor="loggers">Loggers</label>
            </div>
            <div>
              <input type="checkbox" name="actuators" value="liquibase" onChange={onChangeHandler} checked={formData.actuators.indexOf('liquibase') !== -1} />
              <label htmlFor="liquibase">Liquibase</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <button className="newbtn" onClick={axiosTest} >Generate</button>
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
