import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
  
class DishDetail extends Component {
    constructor(props){
        super(props)
    }

    renderDish(dish) {
        if (dish != null)
            return(
                <div  className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    renderComments(comments){
        if(comments != null){
            let commentList = comments.map((comment) => {
                return(
                    <li key={comment.id}>
                        <div>
                            <p>{comment.comment}</p>
                            <p>--{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    </li>
                )
            })
            return(
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <ul className="list-unstyled">
                                {commentList}
                            </ul>
                        </div>
            )
        }else{
            return(<div></div>)
        }
    }
    render(){
        var dishComments = null;
        // test 
        if(this.props.dish){
            // call a renderComments function
            dishComments = this.renderComments(this.props.dish.comments);
        }else{
            dishComments = <div></div>;
        }
        return(
            <div className="container">
                <div className="row">                
                    {this.renderDish(this.props.dish)}
                    
                    {dishComments}               
                </div>
            </div>
        )
    }
} 
export default DishDetail;