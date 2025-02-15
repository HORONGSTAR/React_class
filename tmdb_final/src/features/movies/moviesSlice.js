import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies, getMovieDetails, getMovieCredits, searchMovie } from '../../api/tmdbApi'

/*
createAsyncThunk의 async함수에서 매개변수로 값을 여러개 받으려면 
객체 혹은 배열로 받아야 한다
*/

//인기, 현재 상영중, 개봉예정 영화 목록을 API로 부터 가져옴
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ category, page }) => {
   const response = await getMovies(category, page)
   return response.data.results
})

//영화 상세 정보 가져오기
export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (movieId) => {
   const response = await getMovieDetails(movieId)
   return response.data
})

//출연 배우 정보 가져오기
export const fetchMovieCredits = createAsyncThunk('movies/fetchMovieCredits', async (movieId) => {
   const response = await getMovieCredits(movieId)
   return response.data
})

//검색어로 영화 검색
export const fetchSearchResults = createAsyncThunk('movies/fetchSearchResults', async ({ query, page }) => {
   const response = await searchMovie(query, page)
   return response.data.results
})

const moviesSlice = createSlice({
   name: 'movies',
   initialState: {
      loading: false, //로딩여부
      movies: [], //영화정보
      movieDetails: null, //영화 상세 정보
      movieCredits: null, //출연 배우 정보
      searchResults: [], //검색결과
      error: null, //에러메세지
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         //대기상태
         .addCase(fetchMovies.pending, (state) => {
            state.loading = true
            state.error = null //새로운 요청 시 에러 초기화
         })
         //성공상태
         .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false

            // 페이지가 1일때 새로운 데이터로 state 업데이트
            if (action.meta.arg.page === 1) {
               state.movies = action.payload
            } else {
               //페이지가 2 이상일때 기존데이터 + 새로운 데이터로 state 업데이트
               state.movies = [...state.movies, ...action.payload]
            }
         })
         //실패상태(에러발생)
         .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })

         .addCase(fetchMovieDetails.pending, (state) => {
            state.loading = true
            state.error = null //새로운 요청 시 에러 초기화
         })
         .addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.loading = false
            state.movieDetails = action.payload
         })
         .addCase(fetchMovieDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })

         .addCase(fetchMovieCredits.pending, (state) => {
            state.loading = true
            state.error = null //새로운 요청 시 에러 초기화
         })
         .addCase(fetchMovieCredits.fulfilled, (state, action) => {
            state.loading = false
            state.movieCredits = action.payload
         })
         .addCase(fetchMovieCredits.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(fetchSearchResults.pending, (state) => {
            state.loading = true
            state.error = null //새로운 요청 시 에러 초기화
         })
         .addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.loading = false
            // 페이지가 1일때 새로운 데이터로 state 업데이트
            if (action.meta.arg.page === 1) {
               state.searchResults = action.payload
            } else {
               //페이지가 2 이상일때 기존데이터 + 새로운 데이터로 state 업데이트
               state.searchResults = [...state.searchResults, ...action.payload]
            }
         })
         .addCase(fetchSearchResults.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default moviesSlice.reducer
