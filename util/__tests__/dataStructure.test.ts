import { UserWithProfilePicAndDistricts } from '../dataStructure';

function isUserWithProfilePicAndDistricts(
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

describe('User data structure', () => {
  it('should validate UserWithProfilePicAndDistricts data structure', () => {
    // Create a valid UserWithProfilePicAndDistricts object
    const validUser: UserWithProfilePicAndDistricts = {
      id: 1,
      username: 'test_user',
      homeDistrict: 'test_home_district',
      workDistrict: 'test_work_district',
      profilePic: 'test_profile_pic',
    };

    // Create an invalid UserWithProfilePicAndDistricts object
    const invalidUser = {
      id: '1',
      username: 'test_user',
      homeDistrict: 'test_home_district',
      workDistrict: 'test_work_district',
      profilePic: 'test_profile_pic',
    };

    // Check if the utility function correctly validates the data structure
    expect(isUserWithProfilePicAndDistricts(validUser)).toBe(true);
    expect(isUserWithProfilePicAndDistricts(invalidUser)).toBe(false);
  });
});
