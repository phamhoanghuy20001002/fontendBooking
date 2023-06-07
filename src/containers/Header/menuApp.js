export const adminMenu = [
    { //quan ly nguoi dung
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            },
            {

                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'

            // },
            { //quan ly ke hoach kham benh

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },

        ]
    },

    { //quan ly phong kham
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'

            },

        ]
    },
    { //quan ly chuyen khoa
        name: 'menu.admin.speciality', menus: [
            {
                name: 'menu.admin.manage-speciality', link: '/system/manage-speciality'

            },

        ]
    },
    { //quan ly cam nang
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'

            },

        ]
    },
];
export const doctorMenu = [
    { //quan ly ke hoach kham benh
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'

            },


        ]
    },


];