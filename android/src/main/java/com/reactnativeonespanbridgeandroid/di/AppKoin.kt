package com.reactnativeonespanbridgeandroid.di

import android.app.Application
import com.reactnativeonespanbridgeandroid.activation.ActivationViewModel
import com.reactnativeonespanbridgeandroid.data.repository.OneSpanRepository
import com.reactnativeonespanbridgeandroid.data.repository.OneSpanRepositoryImpl
import com.reactnativeonespanbridgeandroid.data.service.OneSpanService
import com.reactnativeonespanbridgeandroid.data.service.OneSpanServiceImpl
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.core.context.startKoin
import org.koin.dsl.module

val appModule = module {

  viewModel { ActivationViewModel(get()) }

  single<OneSpanRepository> { OneSpanRepositoryImpl(get()) }

  single<OneSpanService> { OneSpanServiceImpl.getService() }
}

fun start(myApplication: Application) {
  startKoin {
    androidLogger()
    androidContext(myApplication)
    modules(appModule)
  }
}
