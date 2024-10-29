import React, { useEffect, useState } from 'react';

function UserNameInput({ setUserName }) {
  useEffect(() => {
    let user = '';
    while (!user || !user.trim()) {
      const userResponse = confirm("Entrez votre pseudo ! Cliquez sur 'Annuler' pour quitter.");
      if (userResponse === false) {
        alert("Vous avez annulé l'entrée du pseudo.");
        return;
      }
      user = prompt("Entrez votre pseudo !");
      if (!user || !user.trim()) {
        alert("Vous avez bien un nom tout de même ?!");
      }
    }
    setUserName(user.trim());
    alert(`Bienvenue, ${user.trim()}!`);
  }, [setUserName]);

  return null;
}

export default UserNameInput;
