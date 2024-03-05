type Props = {
  className?: string;
};

export default function UserPrivacy({ className }: Props) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48">
      <rect width="48" height="48" fill="#771AC9" rx="12"/>
      <path fill="#F5B5FF" d="M40.874 19.611c-.301-.417-7.538-10.305-16.707-10.305C15 9.306 7.762 19.194 7.46 19.611a.58.58 0 0 0 0 .685C7.762 20.713 15 30.6 24.167 30.6c9.169 0 16.406-9.859 16.707-10.305a.58.58 0 0 0 0-.685Zm-16.707 7.365a7.022 7.022 0 1 1 0-14.045 7.022 7.022 0 0 1 0 14.045Z"/>
      <path fill="#fff" d="M21 38.248h6.334V27.672a3.176 3.176 0 0 0-3.167-3.185 3.176 3.176 0 0 0-3.168 3.185v10.576Z"/>
      <circle cx="24.224" cy="19.849" r="3.553" fill="#70ECFE"/>
    </svg>
  )
}
