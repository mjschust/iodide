/* global USE_OPENIDC_AUTH */

import React from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion';
import Avatar from '@material-ui/core/Avatar'
import ExpandMore from '@material-ui/icons/ExpandMore'

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import LoginModal from './login-modal'
import Menu from './components/menu'
import MenuItem from './components/menu-item'
import MenuDivider from './components/menu-divider'
import Popover from './components/popover'
import { logoutFromServer, loginToServer } from '../tools/login'


const AvatarButtonContainer = styled('div')`
  align-items: center;
  display: inline-flex;
  color: white;
`

export default class UserMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: props.isAuthenticated,
      name: props.username,
      avatar: props.avatar,
      loginModalVisible: false,
    }

    this.goToProfile = this.goToProfile.bind(this)
    this.goToDocs = this.goToDocs.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.logoutSuccess = this.logoutSuccess.bind(this)
    this.showLoginModal = this.showLoginModal.bind(this)
    this.hideLoginModal = this.hideLoginModal.bind(this)
  }

  goToProfile() {
    window.open(`/${this.state.name}`)
    this.handleMenuClose()
  }

  goToDocs() {
    window.open('https://iodide.io/docs')
    this.handleMenuClose()
  }

  hideLoginModal() {
    this.setState({ loginModalVisible: false })
  }

  showLoginModal() {
    this.setState({ loginModalVisible: true })
  }

  logoutSuccess() {
    if (this.props.refreshOnLoginLogout) {
      window.location.reload()
    }
    // else...
    this.setState({ isLoggedIn: false })
  }

  login() {
    let authWindow
    const loginSuccess = (args) => {
      if (this.props.refreshOnLoginLogout) {
        window.location.reload()
      }
      // else...
      if (args) {
        const { name, avatar } = args
        this.setState({ name, avatar })
      }
      this.setState({ isLoggedIn: true })
      if (authWindow) {
        authWindow.close()
      }
    }
    if (this.props.loginCallback) {
      this.props.loginCallback(loginSuccess)
    } else {
      loginToServer()
      window.loginSuccess = loginSuccess

      window.loginFailure = () => {
        // do something smart here (probably pop up a notification)
        authWindow.close()
      }
    }
  }

  // FIXME: we should handle the logout failure case somehow (e.g. by popping up a notification)
  logout() {
    if (this.props.logoutCallback) {
      this.props.logoutCallback()
      this.setState({ isLoggedIn: false })
    } else {
      logoutFromServer(this.logoutSuccess, response => console.error('Logout unsuccessful', response))
    }
  }

  render() {
    const { avatar } = this.state.avatar ? this.state : this.props
    return (
      <Tooltip title="Menu">
        <React.Fragment>
          {
              (this.state.isLoggedIn || this.props.isAuthenticated) && (
                <div style={{ marginRight: '20px' }}>
                  <Popover
                    title={
                      <AvatarButtonContainer>
                        <Avatar style={{ width: 28, height: 28 }} src={avatar} />
                        <ExpandMore style={{ width: 15, height: 15 }} />
                      </AvatarButtonContainer>
                    }
                    placement={this.props.placement || 'bottom-start'}
                  >
                    <Menu>
                      <MenuItem onClick={this.goToProfile}>
                        Your Profile
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={this.goToDocs}>
                        Docs
                      </MenuItem>
                      {
                        !USE_OPENIDC_AUTH && (
                          <MenuItem onClick={this.logout}>
                            Log Out
                          </MenuItem>
                        )
                      }
                    </Menu>
                  </Popover>
                </div>
              )
          }
          {
              !(this.state.isLoggedIn || this.props.isAuthenticated) && (
              <div>
                <Button
                  variant="text"
                  style={{
                    color: 'white', width: '80px', padding: '0',
                  }}
                  onClick={this.showLoginModal}
                >
                  Log In
                </Button>
                <LoginModal
                  visible={this.state.loginModalVisible}
                  onClose={this.hideLoginModal}
                  login={this.login}
                />
              </div>
              )
            }
        </React.Fragment>
      </Tooltip>
    )
  }
}

function mapStateToProps(state) {
  const isAuthenticated = Boolean(state.userData.name)
  return {
    isAuthenticated,
    avatar: state.userData.avatar,
  }
}

connect(mapStateToProps)(UserMenu)
