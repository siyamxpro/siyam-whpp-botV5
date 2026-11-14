/**
 * @author 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡
 */

function isOwner(sender, owners = []) {
  return owners.includes(sender);
}

function isAdmin(sender, admins = []) {
  return admins.includes(sender);
}

function hasPermission(sender, allowed = []) {
  return allowed.includes(sender);
}

function checkPermission(sender, config = {}) {
  return {
    owner: isOwner(sender, config.owner || []),
    admin: isAdmin(sender, config.admin || []),
    allowed: hasPermission(sender, config.allowed || [])
  };
}

module.exports = {
  isOwner,
  isAdmin,
  hasPermission,
  checkPermission
};
