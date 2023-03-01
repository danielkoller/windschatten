'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './page.module.scss';

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="Username">Username</label>
        <input
          placeholder="Username"
          {...register('Username', { required: true, maxLength: 80 })}
        />
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <input
          placeholder="Password"
          {...register('Password', { required: true, pattern: /^\S+@\S+$/i })}
        />
      </div>
      <div>
        <label htmlFor="Home District">Home District</label>
        <select {...register('Home District', { required: true })}>
          <option value="Innere Stadt">Innere Stadt</option>
          <option value=" Leopoldstadt"> Leopoldstadt</option>
          <option value=" Landstraße"> Landstraße</option>
          <option value=" Wieden"> Wieden</option>
          <option value=" Margareten"> Margareten</option>
          <option value=" Mariahilf"> Mariahilf</option>
          <option value=" Neubau"> Neubau</option>
          <option value=" Josefstadt"> Josefstadt</option>
          <option value=" Alsergrund"> Alsergrund</option>
          <option value=" Favoriten"> Favoriten</option>
          <option value=" Simmering"> Simmering</option>
          <option value=" Meidling"> Meidling</option>
          <option value=" Hietzing"> Hietzing</option>
          <option value=" Penzing"> Penzing</option>
          <option value=" Rudolfsheim-Fünfhaus"> Rudolfsheim-Fünfhaus</option>
          <option value=" Ottakring"> Ottakring</option>
          <option value=" Hernals"> Hernals</option>
          <option value=" Währing"> Währing</option>
          <option value=" Döbling"> Döbling</option>
          <option value=" Brigittenau"> Brigittenau</option>
          <option value=" Floridsdorf"> Floridsdorf</option>
          <option value=" Donaustadt"> Donaustadt</option>
          <option value=" Liesing"> Liesing</option>
        </select>
      </div>
      <div>
        <label htmlFor="Work District">Work District</label>
        <select {...register('Work District')}>
          <option value="Innere Stadt">Innere Stadt</option>
          <option value=" Leopoldstadt"> Leopoldstadt</option>
          <option value=" Landstraße"> Landstraße</option>
          <option value=" Wieden"> Wieden</option>
          <option value=" Margareten"> Margareten</option>
          <option value=" Mariahilf"> Mariahilf</option>
          <option value=" Neubau"> Neubau</option>
          <option value=" Josefstadt"> Josefstadt</option>
          <option value=" Alsergrund"> Alsergrund</option>
          <option value=" Favoriten"> Favoriten</option>
          <option value=" Simmering"> Simmering</option>
          <option value=" Meidling"> Meidling</option>
          <option value=" Hietzing"> Hietzing</option>
          <option value=" Penzing"> Penzing</option>
          <option value=" Rudolfsheim-Fünfhaus"> Rudolfsheim-Fünfhaus</option>
          <option value=" Ottakring"> Ottakring</option>
          <option value=" Hernals"> Hernals</option>
          <option value=" Währing"> Währing</option>
          <option value=" Döbling"> Döbling</option>
          <option value=" Brigittenau"> Brigittenau</option>
          <option value=" Floridsdorf"> Floridsdorf</option>
          <option value=" Donaustadt"> Donaustadt</option>
          <option value=" Liesing"> Liesing</option>
        </select>
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
}
