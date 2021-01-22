import React,{Component} from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import {graphql} from 'react-apollo';
import CurrentUser from '../queries/currentUser'
import { Router } from 'express';
import {HashHistory} from 'react-router';

class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state={errors:[]};
    }
    componentWillUpdate(nextProps){
        // this.props // the odd ,current set of props
        // nextProps // the next set of props will be
        // in place when component rerenders
        if(!this.props.data.user && nextProps.data.user){
            // redirect to dashboard!!
            HashHistory.push('/dashboard');
        }
    }
    onSubmit({email,password}){
        this.props.mutate({
            variables: {
                // using es6 here actual email: email
                email,
                password
            },
            refetchQueries: [{query: CurrentUser}]
        })
        .catch(res=>{
            const errors = res.graphQLErrors.map((error)=>error.message);
            this.setState({errors});
        });
    }
    render(){
        return (
            <div>
              <h3>Sign Up</h3>
              <AuthForm 
              errors={this.state.errors} 
              onSubmit={this.onSubmit.bind(this)}
              />
            </div>
        )
    }
}

export default graphql(CurrentUser)(
    graphql(mutation)(SignupForm)
);