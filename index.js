import React, { Component } from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class App extends Component {
   
    constructor(props) {
        super(props);
         this.state = {flag:false ,open:false};
        
    }

   componentDidMount()
   {
    if(this.refs.firstName.input.value=='' || this.refs.lastName.input.value=='' ||this.refs.age.input.value=='' ||this.refs.address.input.value=='')
    {
     this.setState({open:!this.state.open})
    }
    this.setState({reteriveUserDetails:{}})
    
   }
   
    //to prefill the data enter by user
     recordDetails()
     {
          //to reterieve data in local storage 
        var retrievedObject = localStorage.getItem('UserDetails');
        var detailsFilled=JSON.parse(retrievedObject);
        this.setState({reteriveUserDetails:detailsFilled})
     }
     //get the form details of user
    getFormDetails()
    {
          if(this.refs.firstName.input.value=='' || this.refs.lastName.input.value=='' ||this.refs.age.input.value=='' ||this.refs.address.input.value=='')
       {

        
        this.setState({open:!this.state.open})
       }
       else
       {
        this.setState({flag:!this.state.flag})
        var bioDetails={
            firstName:this.refs.firstName.input.value,
            lastName:this.refs.lastName.input.value,
            age:this.refs.age.input.value,
            address:this.refs.address.input.value
      }
   
      //to set data in local storage 
           localStorage.setItem('UserDetails', JSON.stringify(bioDetails));
       }
       
        

    }
    //handle the image and read image when user select any image from local
    handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }
      navigateToFrom()
      {
        this.setState({flag:!this.state.flag})
        this.setState({reteriveUserDetails:{}}) //to remove the previous data store in object
      }
      stayonFormPage()
      {
      
        this.setState({open:!this.state.open})
        
        var retrievedObject = localStorage.getItem('UserDetails');
        var detailsFilled=JSON.parse(retrievedObject);
        
        
      }
      confirmNavigateToRecord()
      {
       
        this.setState({open:!this.state.open})
        this.setState({flag:!this.state.flag})
        var bioDetails={
         firstName:this.refs.firstName.input.value,
         lastName:this.refs.lastName.input.value,
         age:this.refs.age.input.value,
         address:this.refs.address.input.value
   }

   //to set data in local storage 
        localStorage.setItem('UserDetails', JSON.stringify(bioDetails));

      }
      browserRefresh()
      {
          
        var bioDetails={
            firstName:this.refs.firstName.input.value,
            lastName:this.refs.lastName.input.value,
            age:this.refs.age.input.value,
            address:this.refs.address.input.value
      }
   
      //to set data in local storage 
           localStorage.setItem('UserDetails', JSON.stringify(bioDetails));
      }
    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={()=>this.stayonFormPage()}
            />,
            <FlatButton
              label="Confirm"
              primary={true}
              keyboardFocused={true}
              onClick={()=>this.confirmNavigateToRecord()}
            />,
          ];
      
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div >
                <MuiThemeProvider>
                    <div>
                    <div>
                    <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
         
        >
         You want to save your unsaved changes or navigate anyway ??
        </Dialog>
                    </div>
                        
                    {this.state.flag ?<Paper style={{width:'80%',height:'80%', align: 'center'}}>
                    <div> 
                        Prefilled User Details
                        
                            <div>
                        <TextField style={{margin:'15px'}} value={this.state.reteriveUserDetails && this.state.reteriveUserDetails.firstName} floatingLabelText="First Name" ref="firstName" />
                        <TextField value={ this.state.reteriveUserDetails && this.state.reteriveUserDetails.lastName}floatingLabelText="Last Name" ref="lastName" />
                        <TextField value={this.state.reteriveUserDetails && this.state.reteriveUserDetails.age}floatingLabelText="Age" ref="age"/>
                        <TextField value={this.state.reteriveUserDetails && this.state.reteriveUserDetails.address} floatingLabelText="Address" ref="address"/>
                      </div>
                        
                        
                    </div>
                    <div  style={{marginTop:'20px'}}>
                    <RaisedButton  label="Record" primary={true}  onClick={()=>this.recordDetails()}/>
                    <RaisedButton  style={{marginLeft:'20px'}} label="Back" secondary={true}  onClick={()=>this.navigateToFrom()}/>
                    </div>
                    </Paper> : <Paper style={{width:'80%',height:'80%', align: 'center'}}>
                     Form Details
                    <div>
                        <TextField value={this.state.reteriveUserDetails && this.state.reteriveUserDetails.firstName} onChange={()=>this.browserRefresh()} floatingLabelText="First Name" ref="firstName" />
                        <TextField   value={ this.state.reteriveUserDetails && this.state.reteriveUserDetails.lastName} onChange={()=>this.browserRefresh()} floatingLabelText="Last Name" ref="lastName" />
                        <TextField value={this.state.reteriveUserDetails && this.state.reteriveUserDetails.age} onChange={()=>this.browserRefresh()}floatingLabelText="Age" ref="age"/>
                        <TextField   value={this.state.reteriveUserDetails && this.state.reteriveUserDetails.address}  onChange={()=>this.browserRefresh()} floatingLabelText="Address" ref="address"/>
                     
                        
                    </div>
                    <div>
                    <div className="previewComponent">
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this.handleImageChange(e)} />
            <div  style={{marginLeft:'20px',marginTop:'20px'}}>
                    <RaisedButton  label="Submit" primary={true}  onClick={()=>this.getFormDetails()}/>
                    </div>
         
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
                    
                        </div>
                    
                    </Paper>}
                    </div>
                
                </MuiThemeProvider>
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));
