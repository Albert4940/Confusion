import { Navbar, NavbarBrand } from 'reactstrap';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent.js'; 
import {DISHES} from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Component } from 'react';
class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }
  
  render(){
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    const HomePage = () => {
      return(
          <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    const AboutPage = () => {
      return(
          <About 
          
          /*You must change value of all "featured" proprieties into "true"
          in your leaders.js file in order to list all leaders*/

          leaders={this.state.leaders}
          />
      );
    }
  return (
    <div>
      <Header />
      <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
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

export default Main;
