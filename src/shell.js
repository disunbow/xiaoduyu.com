import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setScrollPosition, saveScrollPosition } from './actions/scroll'
import { addHistory } from './actions/history'

import Sign from './components/sign'

const Shell = (_component) => {

  class CP extends Component {

    constructor(props) {
      super(props)
    }
    
    render() {
      return (<div>
        <Sign />
        <this.props.component {...this.props} />
      </div>)
    }

    // 组件加载完成
    componentDidMount() {
      // 设置滚动条位置
      this.props.setScrollPosition(this.props.location ? this.props.location.pathname : '')
    }

    // 更新组件
    componentDidUpdate() {
    }

    // 组件被卸载
    componentWillUnmount() {
      // 储存滚动条位置
      this.props.saveScrollPosition(this.props.location ? this.props.location.pathname : '')
      this.props.addHistory(this.props.location ? this.props.location.pathname : '')
    }

  }

  CP.defaultProps = {
    component: _component
  }

  CP.propTypes = {
    setScrollPosition: PropTypes.func.isRequired,
    saveScrollPosition: PropTypes.func.isRequired,
    addHistory: PropTypes.func.isRequired,
  }

  const mapStateToProps = (state) => {
    return {}
  }

  const mapDispatchToProps = (dispatch, props) => {
    return {
      setScrollPosition: bindActionCreators(setScrollPosition, dispatch),
      saveScrollPosition: bindActionCreators(saveScrollPosition, dispatch),
      addHistory: bindActionCreators(addHistory, dispatch),
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(CP)
}


export default Shell
