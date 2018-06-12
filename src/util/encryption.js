/**
 * Created by milad on 2/18/18.
 */
import bCrypt from 'bcrypt';
const saltRound = 10;

export const generatePasswordHash = password => {
  const salt = bCrypt.genSaltSync(saltRound);
  return bCrypt.hashSync(password, salt);
};

export const comparePasswordWithHashed = (password, passwordHash)=> {
  return bCrypt.compareSync(password, passwordHash);
};