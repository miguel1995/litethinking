import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import ShowUser from "../user/showUser";

test('renders content', () =>{
        

        const component =  render (<ShowUser></ShowUser>);
        component.getByText("Edit");
        component.getByText("@");
        console.log(component);
        
    }
);