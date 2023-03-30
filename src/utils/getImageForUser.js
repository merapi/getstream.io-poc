import users from "../users";

export default function getImageForUser(id) {
  return users.find((u) => u.id == id).image;
}
