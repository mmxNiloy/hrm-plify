import { cn } from "@/lib/utils";
import {
  Moon,
  SunMedium,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ShoppingCart,
  Check,
  MinusCircle,
  PlusCircle,
  LogIn,
  XIcon,
  EyeIcon,
  EyeOffIcon,
  CircleUserRound,
  Phone,
  Upload,
  Edit,
  Pin,
  Mail,
  Truck,
  History,
  Settings,
  Hourglass,
  PackageCheck,
  PackageX,
  FolderCog,
  BadgeCheck,
  MapPin,
  Ticket,
  NotebookPen,
  TicketPercent,
  Receipt,
  Pencil,
  HandCoins,
  Trash,
  Camera,
  UploadCloud,
  XCircle,
  Paperclip,
  Calendar,
  Sparkles,
  LogOut,
  LoaderCircle,
  InfoIcon,
  MessagesSquare,
  Send,
  Sparkle,
  Flame,
  Search,
  Menu,
  FileText,
  Image,
  Link,
  Video,
  VideoOff,
  MicOff,
  Mic,
  PhoneOff,
  Minimize,
  Maximize,
  MessageSquare,
  MessageSquareOff,
  Hospital,
  HelpCircle,
  File,
  EllipsisVertical,
  Store,
  Rabbit,
  Squirrel,
  AlertTriangle,
  Bug,
  Cog,
  LifeBuoy,
  Headset,
  Inbox,
  Handshake,
  Key,
  CircleX,
  RefreshCw,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  Cake,
  MoreHorizontal,
  UserPlus,
  Users,
  Cloud,
  Code,
  FileUp,
  ImageUp,
  Telescope,
  Download,
  Home,
  Building,
  Files,
  Images,
  SVGAttributes,
  ListTodo,
  UserSearch,
  UserCog,
  CircleDollarSign,
  ChartArea,
  List,
  Play,
  Bell,
  Building2,
  Scale,
  FileX,
  Contact,
  Printer,
  User2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Users2,
  ChevronsUpDown,
  Filter,
  RefreshCcw,
} from "lucide-react";
import React from "react";

const YouTubeIcon = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className, "lucide lucide-youtube")}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
);
YouTubeIcon.displayName = "YouTubeIcon";

const GenderIcon = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      width={24}
      viewBox="0 0 640 512"
      fill="currentColor"
      className={cn(className, "lucide lucide-gender")}
    >
      <path d="M176 288a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM352 176c0 86.3-62.1 158.1-144 173.1l0 34.9 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0 0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-34.9C62.1 334.1 0 262.3 0 176C0 78.8 78.8 0 176 0s176 78.8 176 176zM271.9 360.6c19.3-10.1 36.9-23.1 52.1-38.4c20 18.5 46.7 29.8 76.1 29.8c61.9 0 112-50.1 112-112s-50.1-112-112-112c-7.2 0-14.3 .7-21.1 2c-4.9-21.5-13-41.7-24-60.2C369.3 66 384.4 64 400 64c37 0 71.4 11.4 99.8 31l20.6-20.6L487 41c-6.9-6.9-8.9-17.2-5.2-26.2S494.3 0 504 0L616 0c13.3 0 24 10.7 24 24l0 112c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L545 140.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176c-50.5 0-96-21.3-128.1-55.4z" />
    </svg>
  )
);
GenderIcon.displayName = "GenderIcon";

const GitHubIcon = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className, "lucide lucide-github")}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
);
GitHubIcon.displayName = "GitHubIcon";

const AnalyticsIcon = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-chart-no-axes-combined", className)}
    >
      <path d="M12 16v5" />
      <path d="M16 14v7" />
      <path d="M20 10v11" />
      <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
      <path d="M4 18v3" />
      <path d="M8 14v7" />
    </svg>
  )
);
AnalyticsIcon.displayName = "AnalyticsIcon";

const PDFIcon = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }, ref) => (
    <svg
      height={24}
      width={24}
      className={cn(className, "lucide")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
    </svg>
  )
);
PDFIcon.displayName = "PDFIcon";

const ExcelIcon = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }, ref) => (
    <svg
      height={24}
      width={24}
      className={cn(className, "lucide")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path d="M48 448L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z" />
    </svg>
  )
);
ExcelIcon.displayName = "ExcelIcon";

const WordIcon = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }, ref) => (
    <svg
      height={24}
      width={24}
      className={cn(className, "lucide")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path d="M48 448L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zm55 241.1c-3.8-12.7-17.2-19.9-29.9-16.1s-19.9 17.2-16.1 29.9l48 160c3 10.2 12.4 17.1 23 17.1s19.9-7 23-17.1l25-83.4 25 83.4c3 10.2 12.4 17.1 23 17.1s19.9-7 23-17.1l48-160c3.8-12.7-3.4-26.1-16.1-29.9s-26.1 3.4-29.9 16.1l-25 83.4-25-83.4c-3-10.2-12.4-17.1-23-17.1s-19.9 7-23 17.1l-25 83.4-25-83.4z" />
    </svg>
  )
);
WordIcon.displayName = "WordIcon";
const Icons = {
  user2: User2,
  update: RefreshCcw,
  word: WordIcon,
  filter: Filter,
  chevronsUpDown: ChevronsUpDown,
  employees: Users2,
  arrowUpDown: ArrowUpDown,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  excel: ExcelIcon,
  pdf: PDFIcon,
  employee: User2,
  printer: Printer,
  contact: Contact,
  handshake: Handshake,
  fileX: FileX,
  scale: Scale,
  company: Building2,
  bell: Bell,
  play: Play,
  list: List,
  chart: ChartArea,
  money: CircleDollarSign,
  userCog: UserCog,
  receipt: Receipt,
  userSearch: UserSearch,
  todo: ListTodo,
  images: Images,
  files: Files,
  building: Building,
  home: Home,
  download: Download,
  telescope: Telescope,
  fileUp: FileUp,
  imageUp: ImageUp,
  code: Code,
  github: GitHubIcon,
  cloud: Cloud,
  users: Users,
  invite: UserPlus,
  more: MoreHorizontal,
  analytics: AnalyticsIcon,
  gender: GenderIcon,
  male: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 448 512"
      fill="currentColor"
    >
      <path d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8l112 0c13.3 0 24 10.7 24 24l0 112c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80s0 0 0 0s0 0 0 0s0 0 0 0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z" />
    </svg>
  ),
  female: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 384 512"
      fill="currentColor"
    >
      <path d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1l0 34.9-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-34.9z" />
    </svg>
  ),
  cake: Cake,
  like: ThumbsUp,
  dislike: ThumbsDown,
  resend: RotateCw,
  error: CircleX,
  key: Key,
  terms: Handshake,
  inbox: Inbox,
  help2: LifeBuoy,
  headset: Headset,
  cog: Cog,
  bug: Bug,
  rabbit: Rabbit,
  squirrel: Squirrel,
  warn: AlertTriangle,
  sun: SunMedium,
  moon: Moon,
  image: Image,
  file: File,
  help: HelpCircle,
  hospital: Hospital,
  link: Link,
  video: Video,
  videoOff: VideoOff,
  micOff: MicOff,
  message: MessageSquare,
  messageOff: MessageSquareOff,
  mic: Mic,
  maximize: Maximize,
  minimize: Minimize,
  phoneOff: PhoneOff,
  document: FileText,
  menu: Menu,
  search: Search,
  chat: MessagesSquare,
  info: InfoIcon,
  send: Send,
  spinner: LoaderCircle,
  settings: Settings,
  sparkles: Sparkles,
  sparkle: Sparkle,
  flame: Flame,
  logout: LogOut,
  truck: Truck,
  camera: Camera,
  history: History,
  coin: HandCoins,
  trash: Trash,
  store: Store,
  pencil: Pencil,
  attachments: Paperclip,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  bag: ShoppingBag,
  cart: ShoppingCart,
  check: Check,
  menuDots: EllipsisVertical,
  mapPin: MapPin,
  note: NotebookPen,
  ticket: Ticket,
  discount: TicketPercent,
  bill: Receipt,
  minus: MinusCircle,
  plus: PlusCircle,
  login: LogIn,
  cross: XIcon,
  visible: EyeIcon,
  hidden: EyeOffIcon,
  user: CircleUserRound,
  phone: Phone,
  upload: Upload,
  edit: Edit,
  pin: Pin,
  mail: Mail,
  hourglass: Hourglass,
  packageCheck: PackageCheck,
  packageX: PackageX,
  folderCog: FolderCog,
  badgeCheck: BadgeCheck,
  uploadCloud: UploadCloud,
  close: XCircle,
  calendar: Calendar,
  fb: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-facebook"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  linkedin: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-linkedin"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  twitter: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-twitter"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  youtube: YouTubeIcon,
  prescription: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dark:invert"
    >
      <path
        d="M10.8353 14.5306C10.9063 14.5311 10.9767 14.5174 11.0422 14.4901C11.1078 14.4629 11.1672 14.4228 11.2169 14.3722C11.2674 14.3223 11.3075 14.2628 11.3349 14.1973C11.3623 14.1318 11.3764 14.0616 11.3764 13.9906C11.3764 13.9196 11.3623 13.8493 11.3349 13.7838C11.3075 13.7183 11.2674 13.6589 11.2169 13.609L9.08933 11.4814L11.2169 9.35016C11.27 9.30072 11.3125 9.24111 11.342 9.17487C11.3716 9.10863 11.3874 9.03712 11.3887 8.96462C11.39 8.89211 11.3767 8.82009 11.3495 8.75285C11.3223 8.68561 11.2819 8.62453 11.2306 8.57325C11.1794 8.52198 11.1183 8.48155 11.051 8.45439C10.9838 8.42723 10.9118 8.4139 10.8393 8.41518C10.7668 8.41645 10.6953 8.43232 10.629 8.46184C10.5628 8.49135 10.5032 8.53391 10.4537 8.58696L8.32613 10.7182L6.12293 8.51496H6.63053C7.21235 8.459 7.75245 8.18829 8.14547 7.75565C8.5385 7.32301 8.75625 6.75947 8.75625 6.17496C8.75625 5.59046 8.5385 5.02691 8.14547 4.59427C7.75245 4.16163 7.21235 3.89092 6.63053 3.83496H4.83053C4.68731 3.83496 4.54996 3.89185 4.44869 3.99312C4.34742 4.09439 4.29053 4.23174 4.29053 4.37496V11.6002C4.29053 11.7434 4.34742 11.8807 4.44869 11.982C4.54996 12.0833 4.68731 12.1402 4.83053 12.1402C4.97374 12.1402 5.1111 12.0833 5.21236 11.982C5.31363 11.8807 5.37053 11.7434 5.37053 11.6002V9.27816L7.57013 11.4814L5.63333 13.4002C5.58282 13.4501 5.54272 13.5095 5.51536 13.575C5.48799 13.6405 5.4739 13.7108 5.4739 13.7818C5.4739 13.8528 5.48799 13.923 5.51536 13.9885C5.54272 14.054 5.58282 14.1135 5.63333 14.1634C5.68281 14.2143 5.74217 14.2547 5.80779 14.2819C5.8734 14.3092 5.94389 14.3227 6.01493 14.3218C6.08591 14.3223 6.15627 14.3086 6.22182 14.2813C6.28738 14.2541 6.34679 14.214 6.39653 14.1634L8.32613 12.2374L10.4537 14.365C10.5028 14.4169 10.562 14.4584 10.6276 14.4868C10.6932 14.5153 10.7638 14.5302 10.8353 14.5306ZM5.35973 4.89696H6.63053C6.9554 4.91427 7.26126 5.05552 7.4851 5.2916C7.70894 5.52769 7.83371 5.84063 7.83371 6.16596C7.83371 6.49129 7.70894 6.80424 7.4851 7.04032C7.26126 7.27641 6.9554 7.41765 6.63053 7.43496H5.35973V4.89696Z"
        fill="black"
      />
      <path
        d="M24.9727 15.92V15.47H25.0843C25.2275 15.47 25.3649 15.4132 25.4661 15.3119C25.5674 15.2106 25.6243 15.0733 25.6243 14.93V12.4604C25.6243 12.3172 25.5674 12.1799 25.4661 12.0786C25.3649 11.9773 25.2275 11.9204 25.0843 11.9204H22.2799V6.70765C22.2834 6.67294 22.2834 6.63796 22.2799 6.60325C22.2713 6.55668 22.2555 6.51173 22.2331 6.47005V6.44125C22.2096 6.39914 22.1805 6.36039 22.1467 6.32605L16.2355 0.440048C16.203 0.40508 16.1638 0.376934 16.1203 0.357248L16.0915 0.339248C16.0508 0.317339 16.0072 0.301568 15.9619 0.292448C15.9272 0.28891 15.8922 0.28891 15.8575 0.292448H1.27389C1.13611 0.2922 1.00345 0.344624 0.903063 0.438988C0.802675 0.533353 0.742153 0.66252 0.733887 0.800048V27.17C0.733887 27.3133 0.79078 27.4506 0.892049 27.5519C0.993319 27.6532 1.13067 27.71 1.27389 27.71H9.31989V33.2C9.31989 33.3433 9.37678 33.4806 9.47805 33.5819C9.57932 33.6832 9.71667 33.74 9.85989 33.74H17.5099C17.6531 33.74 17.7905 33.6832 17.8917 33.5819C17.993 33.4806 18.0499 33.3433 18.0499 33.2V31.436H26.7259C26.8688 31.4351 27.0056 31.3779 27.1067 31.2768C27.2077 31.1758 27.2649 31.039 27.2659 30.896V19.0772C27.2655 18.3764 27.0434 17.6936 26.6315 17.1266C26.2197 16.5595 25.639 16.1372 24.9727 15.92ZM9.49269 21.1904V18.9476H17.8663V21.194L9.49269 21.1904ZM16.2931 22.2704H16.9627V23.4944H10.3999V22.2704H16.2931ZM18.0427 26.4068V22.274H18.4027C18.5456 22.2731 18.6824 22.2159 18.7835 22.1148C18.8845 22.0138 18.9417 21.877 18.9427 21.734V20.654H26.1859V26.414L18.0427 26.4068ZM26.1787 19.5668H18.9463V18.4076C18.9463 18.2644 18.8894 18.1271 18.7881 18.0258C18.6869 17.9245 18.5495 17.8676 18.4063 17.8676H17.7403C17.9419 17.5531 18.2193 17.2943 18.547 17.115C18.8748 16.9358 19.2423 16.8417 19.6159 16.8416H23.9359C24.5285 16.8426 25.0966 17.0784 25.5156 17.4975C25.9347 17.9165 26.1705 18.4846 26.1715 19.0772L26.1787 19.5668ZM23.8927 15.7616H19.6735V15.47H23.8927V15.7616ZM24.5443 14.39H19.0399V13.0004H24.5443V14.39ZM10.3999 24.578H16.9699V30.338H10.3999V24.578ZM16.9699 32.6493H10.3999V31.4252H16.9699V32.6493ZM26.1859 30.3452H18.0499V27.4904H26.1859V30.3452ZM20.4475 6.16765H16.3939V2.11405L20.4475 6.16765ZM1.81389 26.63V1.35085H15.3139V6.70765C15.3139 6.85086 15.3708 6.98822 15.472 7.08949C15.5733 7.19075 15.7107 7.24765 15.8539 7.24765H21.1999V11.9276H18.4819C18.3387 11.9276 18.2013 11.9845 18.1 12.0858C17.9988 12.1871 17.9419 12.3244 17.9419 12.4676V14.9372C17.9419 15.0805 17.9988 15.2178 18.1 15.3191C18.2013 15.4204 18.3387 15.4772 18.4819 15.4772H18.5935V15.92C18.1256 16.0716 17.697 16.3248 17.3385 16.6615C16.98 16.9983 16.7004 17.4101 16.5199 17.8676H8.95989C8.81667 17.8676 8.67932 17.9245 8.57805 18.0258C8.47678 18.1271 8.41989 18.2644 8.41989 18.4076V21.734C8.41989 21.8773 8.47678 22.0146 8.57805 22.1159C8.67932 22.2172 8.81667 22.274 8.95989 22.274H9.31989V26.63H1.81389Z"
        fill="black"
      />
      <path
        d="M23.0645 22.9869H22.3229V22.2669C22.3212 22.2068 22.3103 22.1473 22.2905 22.0905C22.2543 21.9849 22.1858 21.8933 22.0947 21.8287C22.0037 21.7641 21.8946 21.7297 21.7829 21.7305C21.6397 21.7305 21.5024 21.7874 21.4011 21.8886C21.2998 21.9899 21.2429 22.1273 21.2429 22.2705V22.9905H20.5013C20.3581 22.9905 20.2208 23.0474 20.1195 23.1486C20.0182 23.2499 19.9613 23.3873 19.9613 23.5305C19.9613 23.6737 20.0182 23.811 20.1195 23.9123C20.2208 24.0136 20.3581 24.0705 20.5013 24.0705H21.2429V24.8121C21.2447 24.9384 21.2908 25.0601 21.373 25.156C21.4553 25.2519 21.5686 25.3159 21.6932 25.3369C21.8178 25.3579 21.9458 25.3345 22.055 25.2708C22.1641 25.2072 22.2475 25.1073 22.2905 24.9885C22.3103 24.9317 22.3212 24.8722 22.3229 24.8121V24.0669H23.0645C23.2077 24.0669 23.3451 24.01 23.4464 23.9087C23.5476 23.8074 23.6045 23.6701 23.6045 23.5269C23.6045 23.3837 23.5476 23.2463 23.4464 23.145C23.3451 23.0438 23.2077 22.9869 23.0645 22.9869ZM12.4013 28.0017H13.1429V28.7217C13.1429 28.8649 13.1998 29.0022 13.3011 29.1035C13.4024 29.2048 13.5397 29.2617 13.6829 29.2617C13.8261 29.2617 13.9635 29.2048 14.0648 29.1035C14.166 29.0022 14.2229 28.8649 14.2229 28.7217V28.0017H14.9609C15.0599 28.0024 15.1572 27.9755 15.2418 27.9239C15.3264 27.8724 15.3949 27.7984 15.4397 27.7101C15.4834 27.6347 15.5058 27.5488 15.5045 27.4617C15.5045 27.3185 15.4476 27.1811 15.3464 27.0798C15.2451 26.9786 15.1077 26.9217 14.9645 26.9217H14.2229V26.1801C14.2229 26.0369 14.166 25.8995 14.0648 25.7982C13.9635 25.697 13.8261 25.6401 13.6829 25.6401C13.5397 25.6401 13.4024 25.697 13.3011 25.7982C13.1998 25.8995 13.1429 26.0369 13.1429 26.1801V26.9217H12.4013C12.2581 26.9217 12.1208 26.9786 12.0195 27.0798C11.9182 27.1811 11.8613 27.3185 11.8613 27.4617C11.8619 27.5486 11.8842 27.634 11.9261 27.7101C11.971 27.7976 12.0391 27.871 12.1229 27.9225C12.2067 27.9739 12.303 28.0013 12.4013 28.0017Z"
        fill="black"
      />
    </svg>
  ),
};

export { YouTubeIcon };

export default Icons;
