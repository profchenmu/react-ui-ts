
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CALENDAR_ROW_COUNT = 4,
      CALENDAR_COL_COUNT = 3,
      CALENDAR_MONTHS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

class CalendarMonthTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: props.value || new Date(),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current
      });
    }
  }

  render() {
    const { visible } = this.props;
    const style = {
      display: visible ? 'none' : 'block'
    };

    return (
      <div style={style}>
        <table className="ui-calendar-table ui-calendar-month">
          {this.renderMonth()}
        </table>
      </div>
    );
  }

  // 渲染月份
  renderMonth() {
    let dd = new Date(this.state.current),
        current = {
          year : dd.getFullYear(),
          month: dd.getMonth() + 1,
          date : dd.getDate(),
        };

    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(this.renderMonthCell({
        year : current.year,
        month: i,
        date : current.date,
      }));
    }

    let tabelCell = [];
    for (let m = 0; m < CALENDAR_ROW_COUNT; m++) {
      let tabelRow = [];
      for (let n = 0; n < CALENDAR_COL_COUNT; n++) {
        let index = m * CALENDAR_COL_COUNT + n;
        tabelRow.push(
          <td key={`column-${n}`} className="ui-calendar-cell" role="gridcell">
            {months[index]}
          </td>
        );
      }
      tabelCell.push(<tr key={`row-${m}`} role="row">{tabelRow}</tr>);
    }

    return (
      <tbody>
        {tabelCell}
      </tbody>
    );
  }

  // 渲染月份单元
  renderMonthCell(day) {
    const { onMonthClick } = this.props,
          fullDay = `${day.year}/${day.month}/${day.date}`;

    const cls = classnames({
      'ui-calendar-text'         : true,
      'ui-calendar-text-selected': this.state.current === fullDay,
    });
    
    return <span className={cls} title={`${CALENDAR_MONTHS[day.month - 1]}月`} onClick={() => onMonthClick(fullDay)}>{CALENDAR_MONTHS[day.month - 1]}月</span>;
  }

}

CalendarMonthTable.propTypes = {
  defaultValue: PropTypes.string,
  value       : PropTypes.string,
  onMonthClick : PropTypes.func,
};

CalendarMonthTable.defaultProps = {
  defaultValue: '',
  value       : '',
  onMonthClick : () => {},
};

export default CalendarMonthTable;