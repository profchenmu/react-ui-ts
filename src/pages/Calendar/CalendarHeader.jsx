
import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import PropTypes from 'prop-types';

class CalendarHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      panel: props.panel || 'date',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('panel' in nextProps) {
      this.setState({
        panel: nextProps.panel
      });
    }
  }

  render() { 
    const dd = new Date(this.props.current),
          current = {
            year : dd.getFullYear(),
            month: dd.getMonth() + 1,
            date : dd.getDate(),
          },
          beforeYear = parseInt(current.year / 10) * 10;

    return (
      <div className="ui-calendar-header">

        <div style={{display: (this.state.panel !== 'date') ? 'none' : 'block'}}>
          <a href="javascript:;" onClick={() => this.onMonthClick(current, 'pre')} className="ui-calendar-header-pre-btn" title="上个月"><Icon type="arrow-left" /></a>
          <span>
            <a href="javascript:;" className="ui-calendar-header-btn" onClick={() => this.onChangePanel('year')}>{current.year}年</a>
            <a href="javascript:;" className="ui-calendar-header-btn" onClick={() => this.onChangePanel('month')}>{current.month}月</a>
          </span>
          <a href="javascript:;" onClick={() => this.onMonthClick(current, 'next')} className="ui-calendar-header-next-btn" title="下个月"><Icon type="arrow-right" /></a>
        </div>

        <div style={{display: (this.state.panel !== 'month') ? 'none' : 'block'}}>
          <a href="javascript:;" onClick={() => this.onYearClick(current, 'pre')} className="ui-calendar-header-pre-btn" title="去年"><Icon type="arrow-left" /></a>
          <span>
            <a href="javascript:;" className="ui-calendar-header-year-btn" onClick={() => this.onChangePanel('date')}>{current.year}年</a>
          </span>
          <a href="javascript:;" onClick={() => this.onYearClick(current, 'next')} className="ui-calendar-header-next-btn" title="明年"><Icon type="arrow-right" /></a>
        </div>

        <div style={{display: (this.state.panel !== 'year') ? 'none' : 'block'}}>
          <a href="javascript:;" onClick={() => this.onCenturyClick(current, 'pre')} className="ui-calendar-header-pre-btn" title="上个年代"><Icon type="arrow-left" /></a>
          <span>
            <a href="javascript:;" className="ui-calendar-header-year-btn" onClick={() => this.onChangePanel('date')}>{beforeYear} - {beforeYear + 9} 年</a>
          </span>
          <a href="javascript:;" onClick={() => this.onCenturyClick(current, 'next')} className="ui-calendar-header-next-btn" title="下个年代"><Icon type="arrow-right" /></a>
        </div>

      </div>
    )
  }

  // 切换界面
  onChangePanel(panel) {
    this.setState({panel}, this.props.onChangePanel(panel));
  }

  // 切换世纪
  onCenturyClick(current, type) {
    let newYear = current;
    if (type === 'pre') {
      newYear.year = current.year - 10;
    } else {
      newYear.year = current.year + 10;
    }
    const currentString = `${newYear.year}/${newYear.month}/${newYear.date}`;

    this.props.onChange(currentString);
  }

  // 切换年份
  onYearClick(current, type) {
    let newYear = current;
    if (type === 'pre') {
      newYear.year = current.year - 1;
    } else {
      newYear.year = current.year + 1;
    }
    const currentString = `${newYear.year}/${newYear.month}/${newYear.date}`;

    this.props.onChange(currentString);
  }

  // 切换月份
  onMonthClick(current, type) {
    let newMonth = (type === 'pre')
                 ? this.getPreMonth(current)
                 : this.getNextMonth(current);
    const currentString = `${newMonth.year}/${newMonth.month}/${newMonth.date}`;

    this.props.onChange(currentString);
  }

  // 获取下个月
  getNextMonth(current) {
    let result = current;
    if (result.month == 12) {
      result.year = result.year + 1;
      result.month = 1;
    } else {
      result.year = result.year;
      result.month = result.month + 1;
    }
    return result;
  }

  // 获取上个月
  getPreMonth(current) {
    let result = current;
    if (result.month == 1) {
      result.year = result.year - 1;
      result.month = 12;
    } else {
      result.year = result.year;
      result.month = result.month - 1;
    }
    return result;
  }
}

export default CalendarHeader;