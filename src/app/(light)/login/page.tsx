"use client"
import { Authentication } from './components/authentication';
import StepProvider from './providers/step-provider';

export default function AuthPage() {
  return <StepProvider><Authentication /></StepProvider>;
}
