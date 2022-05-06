import React from 'react';
import "./Blogs.css"

const Blogs = () => {
    return (
        <div  className='w-10/12 mx-auto blogs'>

            <div className='w-100'>
                <h2 className=' font-bold text-2xl mt-24 mb-12'>
                    DIFFERENCES BETWEEN JAVASCRIPT AND NODE JS

                </h2>
                <table className='table-auto w-100 '>
                    <thead>
                        <tr>
                            <th> JAVASCRIPT</th>
                            <th> NODE JS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                1. Javascript is a programming language, used for writting scripts on the website
                            </td>
                            <td>
                               1. Node JS is a Javascript runtime envirnment
                            </td>
                        </tr>
                        <tr>
                            <td>2. It is used in frontend development</td>
                            <td>2. It is used in server side development</td>
                        </tr>
                        <tr>
                            <td>3. It can run in web browser like JS core in safari and Spidermonkey in Firefox</td>
                            <td>
                               3. Inside of node.js , V8 is the Javascript engine that parses and runs Javscript.
                            </td>
                        </tr>
                        <tr>
                            <td>4. Javascript can only be run in the browsers</td>
                            <td>4. Javascript can be run outside of browser with the help of NodeJS</td>
                        </tr>
                        <tr>
                            <td>5. Some Javascript frameworks are RamdaJS, TypedJS etc.</td>
                            <td>5. Some of the nodejs modules are Lodash , express etc.</td>
                        </tr>
                    </tbody>

                </table>
            </div>

            <div className='w-100 mt-36'>
                <h2  className=' font-bold text-2xl mt-14 mb-16'>DIFFERENCES BETWEEN SQL AND NoSQL</h2>
                <table className='table-auto w-100 '>
                    <thead>
                        <tr>
                            <th>SQL</th>
                            <th>NoSQP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1. SQL  databases are scalable vartically</td>
                            <td>1. NoSQP databases are horizontally scalable</td>
                        </tr>
                        <tr>
                            <td>2. SQL databases are relational</td>
                            <td>2. NoSQP databases are non-relational</td>
                           
                            
                        </tr>
                        <tr>
                            <td>3. It have a predifined schema and use structured query language</td>
                            <td>3. It have dynamic schemas for unstructured data.</td>
                        </tr>
                        <tr>
                            <td>
                                4. It is table-based

                            </td>
                            <td>4. NoSQL databases are key-value, document or wide-clum stores.</td>
                        </tr>
                        <tr>
                            <td>
                                5. Better for multi-row transactions

                            </td>
                            <td>5. Better for unstructured data like documents or JSON</td>
                            </tr>
                    </tbody>
                </table>
            </div>
            <div className='mt-40'>
                <h2 className='font-bold text-2xl mt-14 mb-12'>JWT AND HOW IT WORKS</h2>
                <div>
                    <h4 className='text-left text-lg font-semibold mb-2 mt-8'>
                        What is JWT?
                    </h4>
                    <p className='text-left'>
                        JWT is a JSON Web Token. It is a standard for representing claims to be transferred between two parties - a client and a server. Each JWT contains encoded JSON object . It is signed using a cryptographic algorithm for ensuring that when the token is issued, the claims can't be altered.
                    </p>
                    <h4 className='text-left text-lg font-semibold mb-2 mt-8'>HOW JWT WORKS</h4>
                    <p className='text-left'>
                        A JWT  is a string and it have three parts.these are separated by dots and senrialized using base64. When it decoded, there have two JSON  strings. One is The header and the payload and other is the signature.
                        
                        The payload contain the claims. it give a json string.
                        And the signature ensures that the token hasn't been altered.When the token is use, the receiving party verifies that the header and payload match the signature.
                    </p>
                </div>
            </div>
            <div className='mt-36 mb-20'>
                <h2 className='font-bold text-2xl mt-14 mb-14'>USAGE OF NODE JS AND MONGODB</h2>
               <p className='text-left'>
               Node Js and Mongodb are two different technologies. Node js is a Javascript engine that run Javascript code. It is used to build server that can respond to web requests. 
                Otherwise , Mongodb is a database engine.It is used to store data. Ir offers an API library , runs within a Nodejs application to give anyone  programmatic access  to mongodb . So anyone can create database and add , query, delete or update data from mongodb database. 

                So , When we need to create a server , then we need to use node js and when we need to create a database , then we need to use mongodb.
               </p>
            </div>

        </div>
    );
};

export default Blogs;