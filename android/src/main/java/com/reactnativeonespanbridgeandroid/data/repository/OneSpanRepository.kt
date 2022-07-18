package com.reactnativeonespanbridgeandroid.data.repository

import com.reactnativeonespanbridgeandroid.data.model.UserRequest
import com.reactnativeonespanbridgeandroid.data.model.UserResponse
import retrofit2.Response

interface OneSpanRepository {
    suspend fun postUser(userRequest: UserRequest): Response<UserResponse>
}
