import React from 'react';
import styled from 'react-emotion'
// import PropTypes from 'prop-types';
import Table from '../components/table'
import { OutlineButton } from '../../shared/components/buttons'

const PaginationContainer = styled('div')`
  display: block;
  margin:auto;
  text-align:center;
  margin-top:40px;
`

const Number = styled('span')`
display: inline-block;
padding:5px;
width: 90px;
text-align:center;
`

const N = styled('span')`
`
const D = styled('span')`
font-weight:300;
color: gray;

`
export class Pagination extends React.Component {
  render() {
    return (
      <PaginationContainer>
        <OutlineButton onClick={this.props.onPrev}>&larr; prev</OutlineButton>
        <Number><N>{this.props.currentPage}</N> / <D>{this.props.pages}</D></Number>
        <OutlineButton onClick={this.props.onNext}>next &rarr;</OutlineButton>
      </PaginationContainer>
    )
  }
}

export const PAGE_SIZE = 15

export default class PaginatedTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentPage: 0 }
    this.pageSize = props.pageSize || PAGE_SIZE
    this.totalPages = Math.floor(props.rows.length / this.pageSize)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
  }

  next() {
    const { currentPage } = this.state
    if (currentPage !== (this.totalPages)) {
      this.setState({
        currentPage: currentPage + 1,
      })
    }
  }

  prev() {
    const { currentPage } = this.state
    if (currentPage > 0) {
      this.setState({ currentPage: currentPage - 1 })
    }
  }

  render() {
    const { currentPage } = this.state
    const ind = currentPage * this.pageSize
    const visibleRows = this.props.rows.slice(ind, ind + this.pageSize)
    if (visibleRows.length < this.pageSize) {
      new Array(this.pageSize - visibleRows.length).fill(null).forEach(() => {
        visibleRows.push(undefined)
      })
    }
    return (
      <React.Fragment>
        <Table>
          {this.props.header &&
          <thead>
            <tr>
              {this.props.header.map(h => (
                <th>{h}</th>
            ))}
            </tr>
          </thead>}
          <tbody>
            {
            visibleRows.map(row => (row ? this.props.getRow(row) :
            <tr><td colSpan={this.props.header.length || 0} /></tr>))
          }
          </tbody>
        </Table>
        <Pagination
          onPrev={this.prev}
          onNext={this.next}
          pages={Math.ceil((this.props.rows.length) / this.pageSize)}
          currentPage={this.state.currentPage + 1}
        />
      </React.Fragment>
    )
  }
}

// TrendingNotebooksList.propTypes = {
//   notebookList: PropTypes.arrayOf(PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     owner: PropTypes.string.isRequired,
//     avatar: PropTypes.string.isRequired,
//   })),
// }
