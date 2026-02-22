// src/components/verification/VerificationBadge.jsx
import { CheckCircle, Clock, XCircle, Shield } from 'lucide-react';

/**
 * Displays user verification status badge
 * Usage: <VerificationBadge status="approved" size="sm" />
 */
export default function VerificationBadge({ status = 'unverified', size = 'md', showIcon = true }) {
  const configs = {
    approved: {
      icon: CheckCircle,
      text: 'Verified',
      shortText: '✓',
      color: 'text-green-600',
      bg: 'bg-green-100',
      border: 'border-green-200'
    },
    pending: {
      icon: Clock,
      text: 'Pending',
      shortText: '⏳',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      border: 'border-yellow-200'
    },
    rejected: {
      icon: XCircle,
      text: 'Rejected',
      shortText: '✗',
      color: 'text-red-600',
      bg: 'bg-red-100',
      border: 'border-red-200'
    },
    unverified: {
      icon: Shield,
      text: 'Not Verified',
      shortText: '?',
      color: 'text-gray-600',
      bg: 'bg-gray-100',
      border: 'border-gray-200'
    }
  };

  const config = configs[status] || configs.unverified;
  const Icon = config.icon;

  const sizes = {
    xs: {
      container: 'px-2 py-0.5 text-xs',
      icon: 'w-3 h-3',
      gap: 'space-x-1'
    },
    sm: {
      container: 'px-2.5 py-1 text-xs',
      icon: 'w-3.5 h-3.5',
      gap: 'space-x-1.5'
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      icon: 'w-4 h-4',
      gap: 'space-x-2'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 'w-5 h-5',
      gap: 'space-x-2'
    }
  };

  const sizeConfig = sizes[size] || sizes.md;

  return (
    <div className={`
      inline-flex items-center rounded-full font-medium
      ${config.bg} ${config.color} ${sizeConfig.container} ${sizeConfig.gap}
      border ${config.border}
    `}>
      {showIcon && <Icon className={sizeConfig.icon} />}
      <span>{config.text}</span>
    </div>
  );
}

/**
 * Displays listing verification status
 * Usage: <ListingVerificationBadge status="pending" />
 */
export function ListingVerificationBadge({ status = 'pending', size = 'md' }) {
  const configs = {
    approved: {
      text: 'Live',
      color: 'text-green-600',
      bg: 'bg-green-100',
      icon: '✓'
    },
    pending: {
      text: 'Pending Verification',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      icon: '⏳'
    },
    rejected: {
      text: 'Not Approved',
      color: 'text-red-600',
      bg: 'bg-red-100',
      icon: '✗'
    }
  };

  const config = configs[status] || configs.pending;

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${config.bg} ${config.color} ${sizes[size]}
    `}>
      <span className="mr-1.5">{config.icon}</span>
      {config.text}
    </span>
  );
}