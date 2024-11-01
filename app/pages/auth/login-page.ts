import { EventData, NavigatedData, Page } from '@nativescript/core';
import { LoginViewModel } from './login-view-model';

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  page.bindingContext = new LoginViewModel();
}

export function onRegisterTap(args: EventData) {
  const button = args.object;
  const page = button.page;
  page.frame.navigate('pages/auth/register-page');
}