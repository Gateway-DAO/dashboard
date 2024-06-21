export const auth = {
  menu: {
    gatewayId: 'Manage Gateway ID',
    disconnect: 'Disconnect',
  },

  create_org: {
    title: 'Create an organization',
    desc: 'Issue and verify on behalf of an organization',
  },
  steps: {
    initial: {
      title: 'Enter the Gateway',
      title_email: 'Email',
      caption_email: 'Get started without a wallet',
      connect_wallet: 'Connect Wallet',
      connect_google: 'Continue with Google',
      connect_twitter: 'Continue with Twitter',
      connect_discord: 'Continue with Discord',
      terms_info: 'By continuing you agree to our',
      terms_of_service: 'Terms of Service',
      term_email:
        "By continuing with email, you'll receive email notifications about your account, including personal data assets and other relevant information.",
      or: 'or',
      continue: 'Continue',
    },
    choose_email: {
      title: 'Receive Notifications from Gateway Protocol',
      subtitle: 'Email',
      description: 'By email you are notified when you receive a credential',
      label: 'E-mail',
      helper_text:
        "You'll receive email updates for your account, including credentials and other relevant information",
    },
    verify_token: {
      title: 'Verify your email',
      description: 'Enter the code sent to your email',
      caption:
        "If you haven't received the verification code in your inbox within a few minutes, please check your Spam or Junk Mail folder.",
      label: 'Code',
      action: 'Verify',
      send_code_again: 'Send code again in',
    },
    add_email: {
      title:
        'Connect your email to be notified when you receive a personal data asset',
      subtitle:
        "You'll receive email updates for your account, including PDAs (personal data assets) and other relevant information.",
      skip: 'Skip for now',
    },
    choose_gateway_id: {
      title: 'Create your Gateway ID',
      subtitle:
        'Gateway ID constitutes a user or an organization on the Gateway Protocol. Additionally, it serves as a powerful solution that serves as a way of aggregating your other identities into a single identifier. ',
      create_username: 'Create your username',
      create_username_rules: 'Use only letters, numbers and the “_” symbol',
      create_display_name: 'How do you want to be called?',
      create_display_name_rules:
        'Fill up your first and last name or choose any name you would like to be called',
      btn: 'create id',
      success: 'Your Gateway ID has been created successfully',
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
  card_summary: {
    verify_email: 'Your email',
  },
  connection_modal: {
    signing: {
      title: 'Sign message with your wallet',
      description:
        "Gateway uses this signature to verify that you're the owner of this address.",
    },
    loading: {
      title: 'Authenticating',
      description: 'Logging you in',
    },
    success: {
      title: 'Authenticated',
      description: "You're now logged in",
    },
    error: {
      title: 'Error verifying signature',
      description: "Please try again or contact support if it doesn't work.",
    },
  },
};

export const newAuth = {
  login: {
    title: 'Scan to login',
  },
  signUp: {
    title: 'Download the Gateway Wallet to sign up',
    description:
      'Scan the QR code to download the app, create your Gateway ID and then log in to the dashboard.',
  },
  download: {
    title: 'Download the Gateway Wallet',
    description:
      'Download the app from an app store and take ownership of your data.',
  },
};
