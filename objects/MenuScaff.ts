import { ReactElement } from "react";

type MenuScaff = {
    name: string,
    icon?: ReactElement,
    path: string;
    childrens?: MenuScaff[];
}
export default MenuScaff;
export function findMenu(menuArray: MenuScaff[], nameToFind: string): MenuScaff[] {
    if (nameToFind == "") {
        return menuArray;
    }
    const foundMenus: MenuScaff[] = [];

    function searchMenus(menuArray: MenuScaff[]) {
        for (const menu of menuArray) {
            if (menu.childrens && menu.childrens.length > 0) {
                searchMenus(menu.childrens);
            }
            else if (menu.name.includes(nameToFind)) {
                foundMenus.push(menu);
            }
        }
    }

    searchMenus(menuArray);
    return foundMenus;
}

export function findMenuAttach(menus: MenuScaff[], searchItemName: string): MenuScaff[] {
    if (searchItemName == "") {
        return menus;
    }
    const foundMenus: MenuScaff[] = [];

    for (const menu of menus) {
      const foundItem = findMenuItem(menu, searchItemName);
      if (foundItem) {
        foundMenus.push({
          ...menu,
          childrens: [foundItem],
        });
      }
    }

    return foundMenus;
  }


function findMenuItem(menu: MenuScaff, searchItemName: string): MenuScaff | undefined {
    if (menu.name.includes(searchItemName)) {
        return menu;
    }

    if (menu.childrens) {
        for (const child of menu.childrens) {
            const foundItem = findMenuItem(child, searchItemName);
            if (foundItem) {
                return {
                    ...menu,
                    childrens: [foundItem],
                };
            }
        }
    }

    return undefined;
}