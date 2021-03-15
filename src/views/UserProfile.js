//import React, { Component } from 'react';
//import UserService from "../services/UserService";
import Api from "../services/Api";
import { getUserByUserId } from "../modules/user/user"

import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default () => {
    const [id, setId] = useState('')
    //const history = useHistory()
  
    useEffect(async (e) => {
      try {
        //const response = await api.post('/sessions', { id })
        const response = await Api.get("/api/v1/users/", { id })   
        setId(response.data.id) 

        // localStorage.setItem('ongId', id)
        // localStorage.setItem('ongName', response.data.name)
  
        //history.push('/profile')
      } catch (err) {
        alert('Falha, tente novamente.')
      }
    },
    []
    )
  
    return (
        <p>Teste{id}</p>
    )
  }