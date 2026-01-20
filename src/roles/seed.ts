// import { DataSource } from 'typeorm';
// import { Role } from './entity/role.entity';
// import { Permission } from './entity/permission.entity';


// export async function seedRolesAndPermissions(dataSource: DataSource) {
//   const roleRepo = dataSource.getRepository(Role);
//   const permRepo = dataSource.getRepository(Permission);

//   // --- Step 1: Create Permissions ---
//   const permissions = [
//     'CREATE_USER',
//     'MANAGE_ROLE',
//     'ASSIGN_PERMISSION',
//     'VIEW_LIBRARY',
//     'MANAGE_LIBRARY',
//     'MANAGE_STUDENT',
//   ].map(name => permRepo.create({ name }));

//   await permRepo.save(permissions);

//   // --- Step 2: Create Roles Hierarchy ---
//   const adminRole = roleRepo.create({ name: 'Admin', description: 'National Admin' });
//   await roleRepo.save(adminRole);

//   const provinceAdmin = roleRepo.create({ name: 'Province Admin', parent: adminRole });
//   await roleRepo.save(provinceAdmin);

//   const districtAdmin = roleRepo.create({ name: 'District Admin', parent: provinceAdmin });
//   await roleRepo.save(districtAdmin);

//   const communeAdmin = roleRepo.create({ name: 'Commune Admin', parent: districtAdmin });
//   await roleRepo.save(communeAdmin);

//   const schoolAdmin = roleRepo.create({ name: 'School Admin', parent: communeAdmin });
//   await roleRepo.save(schoolAdmin);

//   const librarian = roleRepo.create({ name: 'Librarian', parent: schoolAdmin });
//   await roleRepo.save(librarian);

//   const student = roleRepo.create({ name: 'Student', parent: librarian });
//   await roleRepo.save(student);

//   // --- Step 3: Assign Permissions to Roles ---
//   adminRole.permissions = permissions; // full permissions
//   provinceAdmin.permissions = permissions.filter(p => p.name !== 'MANAGE_ROLE'); // example
//   districtAdmin.permissions = permissions.filter(p => ['CREATE_USER','MANAGE_STUDENT'].includes(p.name));
//   communeAdmin.permissions = permissions.filter(p => ['CREATE_USER','VIEW_LIBRARY'].includes(p.name));
//   schoolAdmin.permissions = permissions.filter(p => ['VIEW_LIBRARY','MANAGE_STUDENT'].includes(p.name));
//   librarian.permissions = permissions.filter(p => ['VIEW_LIBRARY'].includes(p.name));
//   student.permissions = [];

//   await roleRepo.save([adminRole, provinceAdmin, districtAdmin, communeAdmin, schoolAdmin, librarian, student]);

//   console.log('✅ Roles & Permissions seeded successfully!');
// }
