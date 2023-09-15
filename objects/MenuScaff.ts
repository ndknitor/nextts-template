import { ReactElement } from "react";

export default interface MenuScaff {
    name: string,
    icon: ReactElement,
    path: string;
    childrens: MenuScaff[];
}
interface MenuWithParent extends MenuScaff {
    parent?: MenuScaff;
}
export function findMenu(menuArray: MenuScaff[], nameToFind: string): MenuScaff[] {
    const foundMenus: MenuScaff[] = [];

    function searchMenus(menuArray: MenuScaff[]) {
        for (const menu of menuArray) {
            if (menu.name.includes(nameToFind)) {
                foundMenus.push(menu);
            }

            if (menu.childrens.length > 0) {
                searchMenus(menu.childrens);
            }
        }
    }

    searchMenus(menuArray);
    return foundMenus;
}

export function findMenuConnect(menuArray: MenuScaff[], partialNameToFind: string): MenuWithParent[] {
    const foundMenus: MenuWithParent[] = [];

    function searchMenus(menuArray: MenuScaff[], parent: MenuScaff | undefined = undefined) {
        for (const menu of menuArray) {
            if (menu.name.includes(partialNameToFind)) {
                foundMenus.push({ ...menu, parent });
            }

            if (menu.childrens.length > 0) {
                searchMenus(menu.childrens, menu);
            }
        }
    }

    searchMenus(menuArray);
    return foundMenus;
}
