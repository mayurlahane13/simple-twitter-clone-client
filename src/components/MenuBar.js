import React, { useState, useContext, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const handleItemClick = (e, { name }) => setActivePage(name);
    const entirePathName = window.location.pathname;
    const path = entirePathName === '/' ? 'home' : entirePathName.substr(1);
    const [activePage, setActivePage] = useState(path);
    const menuBar = (
        user ? (
            <div>
                <Menu pointing secondary size="massive" color="green">
                    <Menu.Item
                        name={user.username}
                        active
                        as={Link}
                        to='/'
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            onClick={logout}
                        />
                    </Menu.Menu>
                </Menu >
            </div >
        ) : (
                <div>
                    <Menu pointing secondary size="massive" color="green">
                        <Menu.Item
                            name='home'
                            active={activePage === 'home'
                            }
                            onClick={handleItemClick}
                            as={Link}
                            to='/'
                        />

                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='login'
                                active={activePage === 'login'}
                                onClick={handleItemClick}
                                as={Link}
                                to='/login'

                            />
                            <Menu.Item
                                name='register'
                                active={activePage === 'register'}
                                onClick={handleItemClick}
                                as={Link}
                                to='/register'
                            />
                        </Menu.Menu>
                    </Menu >
                </div >
            )
    );
    return menuBar;
}

export default MenuBar;

