import React from 'react';
import {
    Card, CardImg, CardText, CardBody, Row, Label, Col,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}
function RenderComments({ comments }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <ul className='list-unstyled'>
                <h4>Comments</h4>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <p> {comment.comment}</p>
                        <p> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                    </li>


                ))}
            </ul>
        </div>

    )
}
function Mod({ toggleModal }) {
    function handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values))
        alert("Current State is:" + JSON.stringify(values))

    }
    return (<>
        <ModalHeader toggle={toggleModal}>
            Login
        </ModalHeader>
        <ModalBody>
            <div className='col-12'>
                <LocalForm onSubmit={(values) => handleSubmit(values)}>
                    <Row className="form-group mt-4">
                        <Label htmlFor="rating" md={2}>Rating</Label>

                        <Col md={10}>
                            <Control.select model=".rating" name="rating"
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group mt-3">
                        <Label htmlFor="yourname" md={2}>Your Name</Label>
                        <Col md={10}>
                            <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(13)
                                }}
                            />
                            <Errors
                                className='text-danger'
                                model=".yourname"
                                show="touched"
                                messages={{
                                    required: 'Required. ',
                                    minLength: 'Must be greater than 2 characters. ',
                                    maxLength: 'Must be 15 characters or less. '
                                }}
                            />
                        </Col>
                    </Row>


                    <Row className="form-group mt-3">
                        <Label htmlFor="message" md={2}>Comment</Label>
                        <Col md={10}>
                            <Control.textarea model=".message" id="message" name="message"
                                rows="12"
                                className="form-control" />
                        </Col>
                    </Row>
                    <Row className="form-group mt-3">
                        <Col md={{ size: 10, offset: 2 }}>
                            <Button type="submit" color="primary">
                                Send Feedback
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </div>
        </ModalBody>
    </>)
}
function DishDeails(props) {
    const [isModalOpen, setModalOpen] = useState(false)
    function toggleModal() {
        setModalOpen(!isModalOpen)
    }
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                    <Button outline onClick={toggleModal}>
                        <span class="fa fa-pencil fa-lg " /> Submit Comment
                    </Button>
                </div>

            </div>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <Mod toggleModal />
            </Modal>
        </div>
    )

}
export default DishDeails;