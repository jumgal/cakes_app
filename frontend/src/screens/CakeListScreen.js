import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import Paginate from '../components/Paginate'
import {
  fetchAllCakes,
  deleteCake,
  createCake
} from '../actions/cakeActions'
import { CAKE_CREATE_RESET } from '../constants/cakeConstants'

const CakeListScreen = ({ history, match }) => {

  const dispatch = useDispatch()

  const cakesList = useSelector((state) => state.cakesList)
  const { loading, error, cakes } = cakesList

  const cakeDelete = useSelector((state) => state.cakeDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = cakeDelete

  const cakeCreate = useSelector((state) => state.cakeCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    cake: createdCake,
  } = cakeCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  // useEffect(() => {

  //   if (userInfo && userInfo.isAdmin) {
  //     dispatch(fetchAllCakes())
  //   } else {
  //     history.push('/login')
  //   }

  // }, [dispatch, history, userInfo])

  useEffect(() => {
    dispatch({ type: CAKE_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/cake/${createdCake._id}/edit`)
    } else {
      dispatch(fetchAllCakes())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdCake,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure to delete this delicious Cake?')) {
      dispatch(deleteCake(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createCake())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Cakes</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Add a Cake
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                {/* <th>BRAND</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cakes.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  {/* <td>{product.brand}</td> */}
                  <td>
                    <LinkContainer to={`/admin/cake/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </>
  )
}

export default CakeListScreen