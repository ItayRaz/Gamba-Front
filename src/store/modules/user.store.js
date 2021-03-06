'use strict';

import userService from '../../services/user.service.js';

export default {
    state: {
        logedInUser: null,
        currUser: null,
        users: [],
        currCoords: {lat: 31.771959, lng: 35.217018}
    },
    getters: {
        logedInUser(state) {
            return state.logedInUser;
        },
        currUser(state) {
            return state.currUser;
        },
        users(state) {
            return state.users;
        },
        currCoords(state){
            return state.currCoords;
        }
    },
    mutations: {
        setLogedUser(state, {user}) {
            state.logedInUser = user;            
        },
        setCurCoords(state, {coords}) {
            state.currCoords = coords.coords;
        },
        setCurrUser(state, {user}) {
            state.currUser = user;
        }
    },
    actions: {
        signIn(context, {user}) {
            return userService.signIn(user)
                .then(data => {
                    var user = data;
                    if (data.ops) user = data.ops[0];
                    context.dispatch({type: 'login', loginInfo: {username: user.username, password: user.password}});
                    return user;
                })
        },
        login(context, {loginInfo}) {
            return userService.login(loginInfo)
                .then(user => {
                    if (user) {
                        context.commit({type: 'setLogedUser', user});
                        return user;
                    } else return Promise.reject();
                });
        },
        logOut(context) {
            return userService.logOut()
                .then(() => context.commit({type: 'setLogedUser', user: null}))
        },
        getUser(context, {_id}) {
            return userService.get(_id)
                .then(user => {
                    context.commit({type: 'setCurrUser', user})
                    return user
                })
        },
        getCurrCoords(context) {
            return navigator.geolocation.getCurrentPosition((coords) => {
                context.commit({type: 'setCurCoords', coords})
                return coords,
                err => err; 
            })
        },
        getLogedUser(context) {
            var user = userService.getLogedUser();
            if (user) {
                context.dispatch({type: 'login', loginInfo: {username: user.username, password: user.password}});
                return user;
            } else return false;
        }
    }
}