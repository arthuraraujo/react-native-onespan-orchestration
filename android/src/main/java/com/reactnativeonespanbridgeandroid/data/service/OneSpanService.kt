package com.reactnativeonespanbridgeandroid.data.service

import com.reactnativeonespanbridgeandroid.data.model.UserRequest
import com.reactnativeonespanbridgeandroid.data.model.UserResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface OneSpanService {

    @POST("v1/users/register")
    suspend fun postUser(@Body userRequest: UserRequest): Response<UserResponse>

}
