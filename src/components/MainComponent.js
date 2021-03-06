import { Navbar, NavbarBrand } from 'reactstrap';
import { LEADERS } from '../shared/leaders';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent.js'; 
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { Component } from 'react';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    
    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    const AboutPage = () => {
      return(
          <About 
          
          /*You must change value of all "featured" proprieties into "true"
          in your leaders.js file in order to list all leaders*/

          leaders={this.props.leaders}
          />
      );
    }
  return (
    <div>
      <Header />
      <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route exact path='/contactus' component={Contact} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/aboutus' component={AboutPage} />
              <Redirect to="/home" />
          </Switch>
       <Footer />
    </div>
  );
}
}

export default withRouter(connect(mapStateToProps)(Main));
