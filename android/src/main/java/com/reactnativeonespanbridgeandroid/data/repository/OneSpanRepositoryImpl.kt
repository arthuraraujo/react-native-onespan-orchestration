package com.reactnativeonespanbridgeandroid.data.repository

import com.reactnativeonespanbridgeandroid.data.model.UserRequest
import com.reactnativeonespanbridgeandroid.data.service.OneSpanService

class OneSpanRepositoryImpl(private val service: OneSpanService): OneSpanRepository {

    override suspend fun postUser(userRequest: UserRequest) = service.postUser(userRequest)

}
