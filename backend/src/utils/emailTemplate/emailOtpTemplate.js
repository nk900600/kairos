const emailOtpTemplate = (otp) => {
  return `
    
    
    
    <!DOCTYPE html>
<html lang="en">
	<body id="kt_body" class="app-blank">
		<script>var defaultThemeMode = "light"; var themeMode; if ( document.documentElement ) { if ( document.documentElement.hasAttribute("data-bs-theme-mode")) { themeMode = document.documentElement.getAttribute("data-bs-theme-mode"); } else { if ( localStorage.getItem("data-bs-theme") !== null ) { themeMode = localStorage.getItem("data-bs-theme"); } else { themeMode = defaultThemeMode; } } if (themeMode === "system") { themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; } document.documentElement.setAttribute("data-bs-theme", themeMode); }</script>
				<div class="px-20" data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_header_nav" data-kt-scroll-offset="5px" data-kt-scroll-save-state="true" style="background-color:#D5D9E2;  padding: 10px; --kt-scrollbar-color: #d9d0cc; --kt-scrollbar-hover-color: #d9d0cc">
					<!--begin::Email template-->
					<style>html,body { padding:0; margin:0; font-family: Inter, Helvetica, "sans-serif"; } a:hover { color: #009ef7; }</style>
					<div id="#kt_app_body_content" style="background-color:#D5D9E2; font-family:Arial,Helvetica,sans-serif; line-height: 1.5; min-height: 100%; font-weight: normal; font-size: 15px; color: #2F3044; margin:0; padding:0; width:100%;">
						<div style="background-color:#ffffff; padding: 45px 0 34px 0; border-radius: 24px; margin:40px auto; max-width: 600px;">
							<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" height="auto" style="border-collapse:collapse">
								<tbody>
									<tr>
										<td align="center" valign="center" style="text-align:center; padding-bottom: 10px">
											<!--begin:Email content-->
											<div style="text-align:center; margin:0 15px 34px 15px">
												<!--begin:Logo-->
												<div style="margin-bottom: 0px">
													<a href="https://app.theshopbusiness.com" rel="noopener" target="_blank">
														<img alt="TheShopBusiness" src="https://kairos-public-images.s3.eu-north-1.amazonaws.com/testgmn(2)(1)(1).png" style="height: 35px" /> 
													</a>
                                                    
												</div>
                                                	<p style="margin-bottom:0px; color:#181C32; font-size: 18px; font-weight:700">The Shop Business</p>
												<!--end:Logo-->
												<!--begin:Media-->
												<div style="margin-bottom: 15px">
													<img alt="Logo" src="https://kairos-public-images.s3.eu-north-1.amazonaws.com/email/icon-positive-vote-2.png" />
												</div>
												<!--end:Media-->
												<!--begin:Text-->
												<div style="font-size: 14px; font-weight: 500; margin-bottom: 27px; font-family:Arial,Helvetica,sans-serif;">
													<p style="margin-bottom:9px; color:#181C32; font-size: 22px; font-weight:700">${otp}</p>
													<p style="margin-bottom:2px; color:#7E8299">Your OTP is valid for 10 minutes. A email updatation requires further verification. To complete the process, enter the verification code. </p>
                                                    
                                             
													
												</div>
												<!--end:Text-->
												<!--begin:Action-->
												
												<!--begin:Action-->
											</div>
											<!--end:Email content-->
										</td>
									</tr>
									<tr style="display: flex; justify-content: center; margin:0 60px 35px 60px">
										<td align="start" valign="start" style="padding-bottom: 10px;">
											<p style="color:#181C32; font-size: 18px; font-weight: 600; margin-bottom:13px">What to learn?</p>
											<!--begin::Wrapper-->
											<div style="background: #F9F9F9; border-radius: 12px; padding:35px 30px">
												<!--begin::Item-->
												<div style="display:flex">
													<!--begin::Media-->
													<div style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
						
														<span style="position: absolute; color:#50CD89; font-size: 16px; font-weight: 600;">1</span>
													</div>
													<!--end::Media-->
													<!--begin::Block-->
													<div>
														<!--begin::Content-->
														<div>
															<!--begin::Title-->
															<a href="https://app.theshopbusiness.com/menus"  target="_blank" style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">Add Menu</a>
															<!--end::Title-->
															<!--begin::Desc-->
															<p style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">Create and manage your restaurant's menu with ease. Add, edit, or remove items, and organize them into categories for better customer experience.</p>
															<!--end::Desc-->
														</div>
														<!--end::Content-->
														<!--begin::Separator-->
														<div class="separator separator-dashed" style="margin:17px 0 15px 0"></div>
														<!--end::Separator-->
													</div>
													<!--end::Block-->
												</div>
												<!--end::Item-->
												<!--begin::Item-->
												<div style="display:flex">
													<!--begin::Media-->
													<div style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
							
														<span style="position: absolute; color:#50CD89; font-size: 16px; font-weight: 600;">2</span>
													</div>
													<!--end::Media-->
													<!--begin::Block-->
													<div>
														<!--begin::Content-->
														<div>
															<!--begin::Title-->
															<a href="https://app.theshopbusiness.com/tables" target="_blank" style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">Add Table</a>
															<!--end::Title-->
															<!--begin::Desc-->
															<p style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">Efficiently manage your restaurant's table orders and arrangements. Keep track of table statuses, and optimize seating for maximum efficiency</p>
															<!--end::Desc-->
														</div>
														<!--end::Content-->
														<!--begin::Separator-->
														<div class="separator separator-dashed" style="margin:17px 0 15px 0"></div>
														<!--end::Separator-->
													</div>
													<!--end::Block-->
												</div>
												<!--end::Item-->
												<!--begin::Item-->
												<div style="display:flex">
													<!--begin::Media-->
													<div style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
							
														<span style="position: absolute; color:#50CD89; font-size: 16px; font-weight: 600;">3</span>
													</div>
													<!--end::Media-->
													<!--begin::Block-->
													<div>
														<!--begin::Content-->
														<div>
															<!--begin::Title-->
															<a href="https://app.theshopbusiness.com/employees" target="_blank" style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">Add Employee</a>
															<!--end::Title-->
															<!--begin::Desc-->
															<p style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">Simplify employee management by tracking schedules, roles, and performance. Ensure smooth operations with easy-to-use tools for managing your staff</p>
															<!--end::Desc-->
														</div>
														<!--end::Content-->
													</div>
													<!--end::Block-->
												</div>
												<!--end::Item-->
											</div>
											<!--end::Wrapper-->
										</td>
									</tr>
									<tr>
										<td align="center" valign="center" style="font-size: 13px; text-align:center; padding: 0 10px 10px 10px; font-weight: 500; color: #A1A5B7; font-family:Arial,Helvetica,sans-serif">
											<p style="color:#181C32; font-size: 16px; font-weight: 600; margin-bottom:9px">It’s all about customers!</p>
											
											<p style="margin-bottom:4px">You may reach us at 
											<a href="mailto:nikhil@theshopbusiness.com" rel="noopener" target="_blank" style="font-weight: 600">nikhil@theshopbusiness.com</a>.</p>
											
										</td>
									</tr>
									<tr>
										<td align="center" valign="center" style="text-align:center; padding-bottom: 20px;">
											
											<a href="https://x.com/nikstosucess">
												<img width="20" height="20" alt="Logo" src="https://kairos-public-images.s3.eu-north-1.amazonaws.com/sl_z_072523_61700_01.jpg" />
											</a>
										</td>
									</tr>
									<tr>
										<td align="center" valign="center" style="font-size: 13px; padding:0 15px; text-align:center; font-weight: 500; color: #A1A5B7;font-family:Arial,Helvetica,sans-serif">
											<p>&copy; Copyright theShopBusiness. 
											
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!--end::Email template-->
				</div>
	</body>
</html>
    `;
};



module.exports = {emailOtpTemplate}