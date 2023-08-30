export const auth = {
  steps: {
    initial: {
      title: 'Enter the Gateway',
      title_email: 'Email',
      caption_email: 'Get started without wallet',
      connect_wallet: 'Connect Wallet',
      connect_google: 'Continue with Google',
      connect_twitter: 'Continue with Twitter',
      connect_discord: 'Continue with Discord',
      terms_info: 'By continuing you agree to our',
      terms_of_service: 'Terms of Service',
      or: 'or',
      btn: 'continue',
    },
    choose_email: {
      title: 'Connect your email to be notified when you receive a credential',
      subtitle: 'Email',
      description: 'By email you are notified when you receive a credential',
      label: 'E-mail',
      helper_text:
        "You'll receive email updates for your account, including credentials and other relevant information",
    },
    verify_token: {
      title: 'Verify your email to create your account',
      description: 'Paste here the code sent to email address',
      caption: 'This code will expire in 30 minutes',
      label: 'Code',
      action: 'Verify',
      send_code_again: 'Send code again',
    },
    choose_gateway_id: {
      title: 'You’re a step closer to entering the Gateway',
      title_send_email: 'Create your personal Gateway ID',
      caption_send_email:
        'Through the ID you are recognized and found within the Gateway',
      btn: 'create id',
      label: 'Gateway ID',
      helper_text: 'Only lowercase letters, numbers and ._-',
    },
    completed: {
      connect_more: {
        title:
          'Connect accounts to make it easier to find you on Gateway and earn credentials',
        description:
          'Connect your social media, wallets, and other platform accounts to Gateway to strengthen your online identity and increase your visibility on the platform.',
        terms_data:
          'We never share any of your data with third parties, and we only request the access permissions necessary to provide you with the best possible service when you connect your accounts to Gateway. Check our',
        terms: 'Terms',
        privacy_policy: 'Privacy Policy',
        and: 'and',
        done: 'Done',
      },
    },
  },
  connected_accounts: {
    description:
      'Connect your account to claim credentials with third-party platforms requirements.',
    twitter: {
      title: 'Twitter',
      description:
        'Connect your account to claim credentials with follow profile, retweet and post a tweet requirements.',
    },
    github: {
      title: 'Github',
      description:
        'Connect your account to claim credentials with repository contribution and pull requests requirements.',
    },
    wallet: {
      title: 'Wallet',
      description:
        'Connect your EVM and Solana wallets to claim credentials with on-chain and offline conditions.',
    },
  },
  card_summary_title: 'Your account',
};
