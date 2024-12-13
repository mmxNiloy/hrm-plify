import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { ISearchParams } from "./Types";
import { IUser, IUserBase } from "@/schema/UserSchema";

export const nationalities: string[] = [
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguan",
  "Argentine",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Botswanan",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burmese",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djiboutian",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirati",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinean",
  "Guinea-Bissauan",
  "Guyanese",
  "Haitian",
  "Honduran",
  "Hungarian",
  "Icelander",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakh",
  "Kenyan",
  "Kiribati",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourger",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivian",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Montenegrin",
  "Moroccan",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "North Korean",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Palestinian",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Philippine",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi Arabian",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovak",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "South Sudanese",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamer",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian or Tobagonian",
  "Tunisian",
  "Turkish",
  "Turkmen",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbek",
  "Vanuatuan",
  "Venezuelan",
  "Vietnamese",
  "Yemeni",
  "Zambian",
  "Zimbabwean",
];
export const countryNames: string[] = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const weekDays: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const maritalStatus: string[] = [
  "Unmarried",
  "Married",
  "Separated",
  "Divorced",
  "Widowed",
];

export function convertTo12Hour(time: string, showSeconds?: boolean): string {
  // Split the time string by colon
  const [hours, minutes, seconds] = time.split(":");

  // Convert the hours to a number
  let hour = parseInt(hours);

  // Determine AM or PM
  const period = hour >= 12 ? "PM" : "AM";

  // Convert hour to 12-hour format
  hour = hour % 12 || 12; // If hour is 0 or 12, show 12

  // Return formatted time with optional seconds
  return `${hour}:${minutes}${
    seconds && showSeconds ? ":" + seconds : ""
  } ${period}`;
}

export function stripSeconds(time: string): string {
  // Split the time string by colon
  const [hours, minutes, seconds] = time.split(":");

  // Return formatted time with optional seconds
  return `${hours}:${minutes}`;
}

export function toYYYYMMDD(date?: Date) {
  if (!date) return "";

  return `${date.getFullYear().toString().padStart(4, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function getPaginationParams(
  searchParams: ISearchParams,
  prefix?: string
): {
  page: number;
  limit: number;
} {
  var page = 1;
  var limit = 5;
  try {
    page = Math.max(
      1,
      Number.parseInt(
        (searchParams[`${prefix ? `${prefix}_` : ""}page`] as
          | string
          | undefined) ?? "1"
      ) || 0
    );
    limit = Math.max(
      5,
      Number.parseInt(
        (searchParams[`${prefix ? `${prefix}_` : ""}limit`] as
          | string
          | undefined) ?? "5"
      ) || 0
    );
  } catch (_) {
    page = 1;
    limit = 5;
  }

  return { page, limit };
}

export function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor(Math.abs(utc2 - utc1) / _MS_PER_DAY);
}

export function getFullNameOfEmployee(employee: IEmployeeWithUserMetadata) {
  return getFullNameOfUser(employee.user);
}
export function getFullNameOfUser(user: IUserBase) {
  return `${user.first_name}${
    user.middle_name.length > 0 ? ` ${user.middle_name}` : ""
  } ${user.last_name}`;
}

export function timeDifference(startTime: string, endTime: string): string {
  // Parse the time strings into hours and minutes
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  // Convert both times to minutes since midnight
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  // Calculate the difference in minutes
  let diffMinutes = endTotalMinutes - startTotalMinutes;

  // Handle case where the difference is negative (next day)
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60; // Add 24 hours worth of minutes
  }

  // Convert the difference back into hours and minutes
  const diffHours = Math.floor(diffMinutes / 60);
  const diffMins = diffMinutes % 60;

  // Format the result as HH:mm
  const formattedDiff = `${String(diffHours).padStart(2, "0")}:${String(
    diffMins
  ).padStart(2, "0")}`;

  return formattedDiff;
}

export function stringToColor(name: string): string {
  // Hash the name string into an integer
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate a color code from the hash
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
}

export function stringToColorRGBA(name: string, alpha: number = 1): string {
  // Hash the name string into an integer
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate the RGB values from the hash
  const r = (hash >> 0) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = (hash >> 16) & 0xff;

  // Return the color in rgba format
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const WIPToastOptions = {
  title: "Work In Progress",
  description:
    "This feature is currently unavailable. It will be available soon. Please try again later.",
  className: "bg-amber-500 text-white",
};
export function bitCount32(n: number) {
  n = n - ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
}

export const RTWListAOptions: string[] = [
  "A passport (current or expired) showing the holder, or a person named in the passport as the child of the holder, is a British citizen or a citizen of the UK and Colonies having the right of abode in the UK.",
  "A passport or passport card (current or expired) showing that the holder is a national of the Republic of Ireland.",
  "A current document issued by the Home Office to a family member of an EEA or Swiss citizen, and which indicates that the holder is permitted to stay in the United Kingdom indefinitely.",
  "A document issued by the Bailiwick of Jersey, the Bailiwick of Guernsey or the Isle of Man, which has been verified as valid by the Home Office Employer Checking Service, showing that the holder has been granted unlimited leave to enter or remain under Appendix EU to the Jersey Immigration Rules, Appendix EU to the Immigration (Bailiwick of Guernsey) Rules 2008 or Appendix EU to the Isle of Man Immigration Rules.",
  "A current Biometric Immigration Document (biometric residence permit) issued by the Home Office to the holder indicating that the person named is allowed to stay indefinitely in the UK, or has no time limit on their stay in the UK.",
  "A current passport endorsed to show that the holder is exempt from immigration control, is allowed to stay indefinitely in the UK, has the right of abode in the UK, or has no time limit on their stay in the UK.",
  "A current Immigration Status Document issued by the Home Office to the holder with an endorsement indicating that the named person is allowed to stay indefinitely in the UK or has no time limit on their stay in the UK, together with an official document giving the person's permanent National Insurance number and their name issued by a government agency or a previous employer.",
  "A birth or adoption certificate issued in the UK, together with an official document giving the person's permanent National Insurance number and their name issued by a government agency or a previous employer.",
  "A birth or adoption certificate issued in the Channel Islands, the Isle of Man or Ireland, together with an official document giving the person's permanent National Insurance number and their name issued by a government agency or a previous employer.",
  "A certificate of registration or naturalisation as a British citizen, together with an official document giving the person's permanent National Insurance number and their name issued by a government agency or a previous employer.",
];

export const RTWListBGroup1Options: string[] = [
  "A current passport endorsed to show that the holder is allowed to stay in the UK and is currently allowed to do the type of work in question.",
  "A current Biometric Immigration Document (biometric residence permit) issued by the Home Office to the holder which indicates that the named person can currently stay in the UK and is allowed to do the work in question.",
  "A current document issued by the Home Office to a family member of an EEA or Swiss citizen, and which indicates that the holder is permitted to stay in the United Kingdom for a time-limited period and to do the type of work in question.",
  "A document issued by the Bailiwick of Jersey, the Bailiwick of Guernsey or the Isle of Man, which has been verified as valid by the Home Office Employer Checking Service, showing that the holder has been granted limited leave to enter or remain under Appendix EU to the Jersey Immigration Rules, Appendix EU to the Immigration (Bailiwick of Guernsey) Rules 2008 or Appendix EU to the Isle of Man Immigration Rules.",
  "A document issued by the Bailiwick of Jersey or the Bailiwick of Guernsey, which has been verified as valid by the Home Office Employer Checking Service, showing that the holder has made an application for leave to enter or remain under Appendix EU to the Jersey Immigration Rules or Appendix EU to the Immigration (Bailiwick of Guernsey) Rules 2008, on or before 30 June 2021.",
  "A frontier worker permit issued under regulation 8 of the Citizens' Rights (Frontier Workers) (EU Exit) Regulations 2020.",
  "A current immigration status document containing a photograph issued by the Home Office to the holder with a valid endorsement indicating that the named person may stay in the UK, and is allowed to do the type of work in question, together with an official document giving the person’s permanent National Insurance number and their name issued by a government agency or a previous employer.",
];

export const RTWListBGroup2Options: string[] = [
  "A document issued by the Home Office showing that the holder has made an application for leave to enter or remain under Appendix EU to the immigration rules on or before 30 June 2021 together with a Positive Verification Notice from the Home Office Employer Checking Service.",
  "A document issued by the Bailiwick of Jersey or the Bailiwick of Guernsey, showing that the holder has made an application for leave to enter or remain under Appendix EU to the Jersey Immigration Rules or Appendix EU to the Immigration (Bailiwick of Guernsey) Rules 2008 on or before 30 June 2021 together with a Positive Verification Notice from the Home Office Employer Checking Service.",
  "An application registration card issued by the Home Office stating that the holder is permitted to take the employment in question, together with a Positive Verification Notice from the Home Office Employer Checking Service.",
  "A Positive Verification Notice issued by the Home Office Employer Checking Service to the employer or prospective employer, which indicates that the named person may stay in the UK and is permitted to do the work in question.",
];

export function withPrecision({
  num,
  precision = 2,
}: {
  num: number;
  precision?: number;
}) {
  if (precision < 1) precision = 1;
  const shift = Math.pow(10, precision);

  return (Math.round(num * shift) / shift).toFixed(precision);
}
