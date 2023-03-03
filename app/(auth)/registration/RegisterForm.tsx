'use client';
import { useForm } from 'react-hook-form';
import { districts } from '../../../database/districts.ts';
import styles from './page.module.scss';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="Username">Username</label>
        <input
          id="Username"
          placeholder="Username"
          {...register('Username', { required: true, maxLength: 80 })}
        />
        {errors.Username && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <input
          id="Password"
          type="password"
          placeholder="Password"
          {...register('Password', { required: true })}
        />
        {errors.Password && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="HomeDistrict">Home District</label>
        <select
          id="HomeDistrict"
          {...register('HomeDistrict', { required: true })}
        >
          {districts.map((district) => (
            <option key={`districts-${district.id}`} value={district.value}>
              {district.label}
            </option>
          ))}
        </select>
        {errors.HomeDistrict && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="WorkDistrict">Work District</label>
        <select
          id="WorkDistrict"
          {...register('WorkDistrict', { required: true })}
        >
          {districts.map((district) => (
            <option key={`districts-${district.id}`} value={district.value}>
              {district.label}
            </option>
          ))}
        </select>
        {errors.WorkDistrict && <span>This field is required</span>}
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
}
