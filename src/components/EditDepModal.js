import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form, FormGroup} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default class EditDepModal extends Component {
    constructor(props){
        super(props);

        this.state = {snackbaropen : false, snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {

        this.setState({snackbaropen:false});
    };

    handleSubmit(event){
        event.preventDefault()
      fetch(`https://localhost:44374/api/department`,{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              DepartmentID:event.target.DepartmentID.value,
              DepartmentName:event.target.DepartmentName.value
          })
      })
      .then(res => res.json())
      .then((result) => {
          this.setState({snackbaropen:true, snackbarmsg:result})
      },
      (error) => {
        this.setState({snackbaropen:true, snackbarmsg:"Failed"})
      }
      )
}

render(){
    return(

        
<div className="container">


<Snackbar anchorOrigin={{vertical:'center', horizontal:'center'}}
          open={this.state.snackbaropen}
          autoHideDuration ={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action = {[
              <IconButton key="close" arial-label="Close" color="inherit" onClick={this.snackbarClose}>
                  X
              </IconButton>
          ]}
/>
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="DepartmentID">
                                <Form.Label>Department ID</Form.Label>
                                <Form.Control
                                type="text"
                                name="DepartmentID"
                                disabled
                                defaultValue ={this.props.depid}
                                placeholder="Department ID"
                                />

                                
                            </Form.Group>
                            <Form.Group controlId="DepartmentName">
                                <Form.Label>Department Name</Form.Label>
                                <Form.Control
                                type="text"
                                name="DepartmentName"
                                required
                                defaultValue ={this.props.depname}
                                placeholder="Department Name"
                                />

                                
                            </Form.Group>
                            <Form.Group>
                            <Button variant="primary" type="submit">
                                Update Department
                            </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
</div>
     
    )
        }





}