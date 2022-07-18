package com.reactnativeonespanbridgeandroid.activation

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.reactnativeonespanbridgeandroid.utils.Status
import org.koin.androidx.viewmodel.ext.android.viewModel

class ActivationActivity : AppCompatActivity() {

  private val viewModel by viewModel<ActivationViewModel>()

  companion object {
    val statusListener = ActivationStatusListener()
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val userId = intent.getStringExtra("userId") ?: ""
    val userPassword = intent.getStringExtra("userPassword") ?: ""

    initObservers()
    viewModel.registerUser(userId, userPassword)
  }

  private fun initObservers() {
    viewModel.userResponse.observe(this) {
      viewModel.startActivation(this, it)
    }

    viewModel.statusLoading.observe(this) {
      when (it) {
        Status.SUCCESS, Status.ERROR -> finish()
        else -> Unit
      }
    }

    viewModel.statusMessage.observe(this) {
      statusListener.onStatusListener?.invoke(it)
    }
  }
}
