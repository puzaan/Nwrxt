// assets
import { DashboardOutlined, UserOutlined, WifiOutlined, WalletOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  WifiOutlined,
  WalletOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'tenant',
      title: 'Tenant',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'service',
      title: 'Service',
      type: 'item',
      url: '/service',
      icon: icons.WifiOutlined,
      breadcrumbs: false
    },
    {
      id: 'room',
      title: 'Room',
      type: 'item',
      url: '/room-view',
      icon: icons.WalletOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
