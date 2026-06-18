import React, { useState, useEffect } from "react";
import { type Customer } from "../../models/Customers";
import { getCustomers } from "../../services/customerService";

export default function CustomerPage() {
  // כאן השורות שאתה שואל עליהן
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getCustomers();
        setCustomers(data);
      } catch (err) {
        setError("Failed to load customers");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            {c.firstName} {c.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { Customer } from "../../models/Customer";
// import {
//   getCustomers,
//   createCustomer,
//   deleteCustomer
// } from "../../services/customerService";

// export default function CustomerPage() {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // State לטופס הוספה
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");

//   // טען נתונים מהשרת
//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const data = await getCustomers();
//       setCustomers(data);
//     } catch (err) {
//       setError("שגיאה בטעינת לקוחות");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // מחיקת לקוח
//   const handleDelete = async (id: string) => {
//     try {
//       await deleteCustomer(id);
//       await loadData();
//     } catch {
//       setError("שגיאה במחיקת לקוח");
//     }
//   };

//   // הוספת לקוח חדש
//   const handleCreate = async () => {
//     if (!firstName || !lastName || !phone) return;

//     const newCustomer: Customer = {
//       id: crypto.randomUUID(), // מזהה ייחודי
//       firstName,
//       lastName,
//       phone,
//       password: "1234", // לדוגמה
//       email: email || undefined
//     };

//     try {
//       await createCustomer(newCustomer);
//       setFirstName("");
//       setLastName("");
//       setPhone("");
//       setEmail("");
//       await loadData();
//     } catch {
//       setError("שגיאה בהוספת לקוח");
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   return (
//     <div>
//       <h1>Customers</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       <div style={{ marginBottom: "20px" }}>
//         <h3>Add Customer</h3>
//         <input
//           placeholder="First Name"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//         <input
//           placeholder="Last Name"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//         <input
//           placeholder="Phone"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={handleCreate}>Add</button>
//       </div>

//       <table border={1} cellPadding={5}>
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Phone</th>
//             <th>Email</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {customers.map((c) => (
//             <tr key={c.id}>
//               <td>{c.id}</td>
//               <td>{c.firstName}</td>
//               <td>{c.lastName}</td>
//               <td>{c.phone}</td>
//               <td>{c.email}</td>
//               <td>
//                 <button onClick={() => handleDelete(c.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }