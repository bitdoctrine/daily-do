import { useEffect, useState } from 'react';
import { storage } from '../firebase/config';

export const useDocument = (collection, docId) => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // const fetchData = async () => {
    //   setError(null);
    //   setIsPending(true);
    //   try {
    //     const doc = await storage.collection(collection).doc(docId).get();
    //     setProject(doc.data());
    //     setIsPending(false);
    //   } catch (err) {
    //     setError(err.message);
    //     setIsPending(false);
    //   }
    // };

    // fetchData();
    setIsPending(true);

    const ref = storage.collection(collection).doc(docId);
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setProject(snapshot.data());
          setIsPending(false);
          setError(null);
        } else {
          setError('No Such Project Exists');
          setIsPending(false);
        }
      },
      (err) => {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, [docId, collection]);

  return { project, error, isPending };
};
