export type User = {
  id: number;
  username: string;
};

export type UserWithProfilePicAndDistricts = User & {
  homeDistrict: string;
  workDistrict: string;
  profilePic: string;
};

export function isUserWithProfilePicAndDistricts(
  object: any,
): object is UserWithProfilePicAndDistricts {
  return (
    typeof object.id === 'number' &&
    typeof object.username === 'string' &&
    typeof object.homeDistrict === 'string' &&
    typeof object.workDistrict === 'string' &&
    typeof object.profilePic === 'string'
  );
}
