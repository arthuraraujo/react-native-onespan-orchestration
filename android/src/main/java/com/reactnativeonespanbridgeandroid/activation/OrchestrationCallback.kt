package com.reactnativeonespanbridgeandroid.activation

import android.util.Log
import com.vasco.orchestration.client.authentication.UserAuthenticationCallback
import com.vasco.orchestration.client.authentication.UserAuthenticationInputCallback
import com.vasco.orchestration.client.errors.*

class OrchestrationCallback : UserAuthenticationCallback, OrchestrationWarningCallback, OrchestrationErrorCallback {

    private val tag = "OrchestrationCallback"

    override fun onUserAuthenticationRequired(
        type: UserAuthenticationCallback.UserAuthentication?,
        inputCallback: UserAuthenticationInputCallback?,
        isEnrollment: Boolean
    ) {
        Log.d(tag, "user type name: " + type?.name)
        Log.d(tag, "user isEnrollment: $isEnrollment")

        inputCallback?.onUserAuthenticationInputSuccess("xxx")
    }

    override fun onUserAuthenticationInputError(error: InputError?) {
        Log.e(tag, "input error: ", error?.inputException)
    }

    override fun onOrchestrationWarning(warning: OrchestrationWarning?) {
        Log.w(tag, "warning code: ${warning?.warningCode}")
        Log.w(tag, "warning code: ${warning?.exception}")
    }

    override fun onOrchestrationError(error: OrchestrationError?) {
        Log.e(tag, "Exception in onOrchestrationError", error?.exception)
    }

    override fun onOrchestrationServerError(error: OrchestrationServerError?) {
        Log.e(tag, "Payload in onOrchestrationServerError: " + error?.customPayload)
    }
}
